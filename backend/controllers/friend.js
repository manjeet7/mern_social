const User = require("../models/user");
const friendmodel = require("../models/friend");
const Conversation = require("../models/conversation");

const sendRequest = async (req, res, next) => {
    const recipeint = req.body;
    console.log("inside send ", recipeint.ids);
    try {
        const newRequest = new friendmodel({
            requester: req.user._id,
            reciepient: recipeint.ids,
            status: 1,
        });
        const request = await newRequest.save();
        console.log("request ", request);
        res.status(201).json({
            data: "Pending",
        });
    } catch (error) {
        console.log("error ", error);
        res.status(500).json(error);
    }
};

const getRequestStatus = async (req, res, next) => {
    const id = req.body.id;
    try {
        const friend = await friendmodel.findOne({
            $and: [{ reciepient: id }, { requester: req.user._id }],
        });
        if (friend) {
            res.status(201);
            res.json({
                data: {
                    status: friend.status,
                },
            });
        }
        if (!friend) {
            res.status(201);
            res.json({
                data: {
                    status: 0,
                },
            });
        }
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};

const incomingRequest = async (req, res, next) => {
    const friend = await friendmodel.findOne({ reciepient: req.user._id });
    console.log("requester is ", friend);
    try {
        if (!friend) {
            res.status(200);
            res.json({
                data: {
                    message: "NO pending request",
                    status: 1,
                },
            });
        }
        if (friend) {
            // await friendmodel.updateOne(
            //     { reciepient: req.user._id },
            //     { $set: { status: 2 } }
            // );
            res.status(201);
            res.json({
                data: {
                    id: friend.requester,
                    status: 2,
                },
            });
        }
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};

const AccepRequest = async (req, res, next) => {
    try {
        const id = req.body.id;
        const user = await User.findById(req.user._id);
        const userb = await User.findById(id);
        const updateb = await userb.update({
            $push: {
                friends: req.user._id,
            },
            $set: {
                status: 2,
            },
        });
        console.log("userb ", userb);
        const update = await user.update({
            $push: {
                friends: id,
            },
            $set: {
                status: 2,
            },
        });
        const newChat = new Conversation({
            members: [id, req.user._id],
        });
        console.log("new chat ", newChat);
        const result = await newChat.save();
        console.log("user ", user);
        await user.save();
        res.status(201);
        await friendmodel.deleteOne({ reciepient: req.user._id });
        res.json({
            data: update,
        });
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};

const RejectRequest = async (req, res, next) => {};

const getFriends = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        const friends = await Promise.all(
            user.friends.map((friendId) => {
                return User.findById(friendId);
            })
        );

        let friendList = [];
        friends.map((friend) => {
            const { id, username } = friend;
            friendList.push({ id, username });
        });
        res.status(200);
        res.json({
            data: friendList,
        });
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};

const checkFriend = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        console.log("user is ", req.body.id);
        const friend = await Promise.all(
            user.friends.filter((friendid) => {
                console.log("inside loop ", friendid, req.body.id);
                return friendid.toString() === req.body.id;
            })
        );
        if (friend) {
            const friends = await User.findById(friend);
            console.log("friends ", friends);
            const { id, username } = friends;
            res.status(201);
            res.json({
                data: id,
            });
        }
        if (!friend) {
            res.status(200);
            res.json({
                data: "",
            });
        }
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};

module.exports = {
    sendRequest,
    incomingRequest,
    AccepRequest,
    getRequestStatus,
    getFriends,
    checkFriend,
};
