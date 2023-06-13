const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const chatController = require("../controllers/Conversation");

router
    .route("/create")
    .post(authController.verify, chatController.createConversation);

router
    .route("/getConvo/:userId")
    .post(authController.verify, chatController.getConversation);
router
    .route("/getTwoConvo/:firstId/:secondId")
    .post(authController.verify, chatController.getTwoConversation);

module.exports = router;
