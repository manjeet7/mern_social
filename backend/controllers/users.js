const bcrypt = require("bcrypt");
const User = require("../models/user");

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
const follow = async (req, res) => {
    const userId = req.user["_id"];
    if (req.body.userId !== userId) {
        try {
            const user = await User.findById(userId);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: userId } });
                res.status(200).json("user has been followed");
            } else {
                res.status(403).json("you already follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you cant follow yourself");
    }
};
const unfollow = async (req, res) => {
    const userId = req.user["_id"];
    if (req.body.userId !== userId) {
        try {
            const user = await User.findById(userId);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: userId } });
                res.status(200).json("user has been unfollowed");
            } else {
                res.status(403).json("you dont follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you cant unfollow yourself");
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

module.exports = {
    update,
    deleteUser,
    getUser,
    getFriends,
    follow,
    unfollow,
    searchUsers,
    resetPassword,
    getUserById,
};
