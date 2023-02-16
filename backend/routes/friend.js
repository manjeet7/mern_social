const router = require("express").Router();
const authController = require("../controllers/auth");
const frienController = require("../controllers/friend");

router
    .route("/sendRequest")
    .post(authController.verify, frienController.sendRequest);
router
    .route("/incoming")
    .post(authController.verify, frienController.incomingRequest);
router
    .route("/accept")
    .post(authController.verify, frienController.AccepRequest);
router
    .route("/getStatus")
    .post(authController.verify, frienController.getRequestStatus);
router
    .route("/getFriends")
    .get(authController.verify, frienController.getFriends);
router.route("/check").post(authController.verify, frienController.checkFriend);

module.exports = router;
