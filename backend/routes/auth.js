const router = require("express").Router();
const authController = require("../controllers/auth");

router.post("/register", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refresh);

module.exports = router;