const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const chatController = require("../controllers/message");

router
    .route("/newMessage")
    .post(authController.verify, chatController.createMessage);
router
    .route("/getMessage/:id")
    .get(authController.verify, chatController.getMessages);

module.exports = router;
