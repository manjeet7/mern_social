const router = require("express").Router();
const authController = require("../controllers/auth");
const userController = require("../controllers/users");

// simple password reset
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
router.put("/follow", authController.verify, userController.follow);
//unfollow a user
router.put("/unfollow", authController.verify, userController.unfollow);
// search users
router.get("/search", authController.verify, userController.searchUsers);

module.exports = router;
