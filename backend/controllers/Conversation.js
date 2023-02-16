const Conversation = require("../models/conversation");
const message = require("../models/message");

const createConversation = async (req, res, next) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).json(err);
    }
};

//get conversation of user

const getConversation = async (req, res, next) => {
    console.log("id ", req.params.userId);
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        console.log("conversation ", conversation);
        res.status(200).json({
            data: conversation,
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

//get conversation include two users

const getTwoConversation = async (req, res, next) => {
    try {
        const conversation = await Conversation.findOne({
            members: {
                $all: [req.params.firstUserId, req.params.secondUserId],
            },
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    createConversation,
    getConversation,
    getTwoConversation,
};
