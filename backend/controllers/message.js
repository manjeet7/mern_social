const conversModel = require("../models/conversation");
const messageModel = require("../models/message");

const createMessage = async (req, res, next) => {
    try {
        const newMessage = new messageModel(req.body);
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json(err);
    }
};

const getMessages = async (req, res, next) => {
    try {
        const messages = await messageModel.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    createMessage,
    getMessages,
};
