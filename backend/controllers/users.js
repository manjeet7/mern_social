const bcrypt = require("bcrypt");
const User = require("../models/user");
const ChatModel = require("../models/conversation");

const resetPassword = async (req, res) => {
    const { username } = req.body;
    const user = await User.findOne({
        $or: [{ email: username }, { mobile: username }],
    });
    if (!user) {
        return res.status(401).send({
            status: "failure",
            message: "user does not exist",
        });
    } else {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }

        try {
            await User.findByIdAndUpdate(user.id, {
                $set: { password: req.body.password },
            });
            res.status(200).json({
                status: "success",
                msg: "Passowrd has been reset successfully",
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    }
};
const update = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can update on your account!");
    }
};
const deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete on your account!");
    }
};
const getUser = async (req, res) => {
    try {
        const user = await User.find({ _id: { $ne: req.user._id } });
        if (!user) throw new Error("User does not exist!");
        // const { password, updatedAt, ...other } = user._doc;
        res.status(200).json({
            data: user,
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

//get user by id
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) throw new Error("User does not exist!");
        // const { password, updatedAt, ...other } = user._doc;
        res.status(200).json({
            data: user,
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const getFriends = async (req, res) => {
    try {
        const userId = req.user["_id"];
        const user = await User.findById(userId);
        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId);
            })
        );
        let friendList = [];
        friends.map((friend) => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
        });
        res.status(200).json(friendList);
    } catch (err) {
        res.status(500).json(err);
    }
};

const followUser = async (req, res) => {
    const id = req.params.id;
    const _id = req.user._id;
    console.log("follower ", _id, "following ", id);
    console.log(id, _id);
    if (_id == id) {
        res.status(403).json("Action Forbidden");
    } else {
        try {
            const followUser = await User.findById(id);
            const followingUser = await User.findById(_id);
            console.log(
                "folllowing - ",
                followingUser,
                "follower -",
                followUser
            );

            // if (!result) {
            //   res.status(500);
            //   res.json({
            //     data: "result",
            //   });
            // } else {
            //   res.json({
            //     data: result,
            //   });
            // }
            if (!followUser.followers.includes(_id)) {
                await followUser.updateOne({ $push: { followers: _id } });
                await followingUser.updateOne({ $push: { following: id } });
                const newChat = new ChatModel({
                    members: [id, _id],
                });
                const result = await newChat.save();
                res.status(200).json("User followed!");
            } else {
                res.status(403).json("you are already following this id");
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
};

const unfollowUser = async (req, res) => {
    const id = req.params.id;
    // const { _id } = req.body;

    if (req.user._id === id) {
        console.log(req.user._id, "  ", id);
        res.status(403).json("Action Forbidden");
    } else {
        try {
            const unFollowUser = await User.findById(id);
            const unFollowingUser = await User.findById(req.user._id);

            console.log(
                "unfollower -",
                unfollowUser,
                "unfollowing -",
                unFollowingUser
            );

            if (unFollowUser.followers.includes(req.user._id)) {
                const chat = await ChatModel.deleteOne({
                    members: { $in: [id] },
                });
                const unfolow = await unFollowUser.updateOne({
                    $pull: { followers: req.user._id },
                });
                await unFollowingUser.updateOne({ $pull: { following: id } });
                res.status(200).json({
                    data: unfolow,
                    id: req.user._id,
                    rahul: id,
                });
            } else {
                res.status(403).json("You are not following this User");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
};
const searchUsers = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const search = req.query.search || "";
        const users = await User.find({
            username: { $regex: search, $options: "i" },
        })
            .select("_id username profilePicture")
            .limit(limit);
        const totalUsers = users.length;
        res.status(200).send({
            status: "success",
            totalUsers: totalUsers,
            limit: limit,
            users: users,
        });
    } catch (e) {
        res.status(500).send({
            status: "failure",
            message: e.message,
        });
    }
};

const checkFollowers = async (req, res) => {
    const id = req.params.id;
    console.log("followers is ", id);
    const user = await User.findById(id);
    const isFolowing = user.followers.find((item) => item === req.user._id);
    console.log("is following ", isFolowing);
    try {
        if (isFolowing) {
            res.status(201).json({
                data: isFolowing,
            });
        } else {
            res.status(201).json({
                data: "follow",
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    update,
    deleteUser,
    getUser,
    getFriends,
    followUser,
    unfollowUser,
    searchUsers,
    resetPassword,
    getUserById,
    checkFollowers,
};
