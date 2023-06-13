const router = require("express").Router();
const authController = require("../controllers/auth");
const userController = require("../controllers/users");

// simple password reset
//follow a user
router.post("/:id/follow", authController.verify, userController.followUser);
//unfollow a user
router.post(
    "/:id/unfollow",
    authController.verify,
    userController.unfollowUser
);
router.post("/check/:id", authController.verify, userController.checkFollowers);
router.post("/resetpassword", userController.resetPassword);
//update user
router.put("/:id", authController.verify, userController.update);
//delete user
router.delete("/:id", authController.verify, userController.deleteUser);
//get all user
router.get("/me", authController.verify, userController.getUser);
//get a user
router.get("/:id", authController.verify, userController.getUserById);
//get friends
router.get("/friends", authController.verify, userController.getFriends);
//follow a user
router.put("/:id/follow", authController.verify, userController.followUser);
//unfollow a user
router.put("/:id/unfollow", authController.verify, userController.unfollowUser);
// search users
router.get("/search", authController.verify, userController.searchUsers);

module.exports = router;
