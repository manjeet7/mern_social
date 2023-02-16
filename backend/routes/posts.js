const router = require("express").Router();
const authController = require("../controllers/auth");
const postsController = require("../controllers/posts");
const multer = require("multer");
const path = require("path");
const UPLOAD_PATH = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("id is ", req.user);
        cb(null, UPLOAD_PATH);
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split("/")[1];
        const fileName = ((new Date().getTime() / 1000) | 0) + "." + extension;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

router.post(
    "/create",
    authController.verify,
    upload.single("file"),
    postsController.createPost
);
router.put("/:id", authController.verify, postsController.updatePost);
router.delete("/:id", authController.verify, postsController.deletePost);
router.post("/like", authController.verify, postsController.likePost);
// router.get("/feed/news", authController.verify, postsController.getNews);
router.get("/", authController.verify, postsController.getPost);
//get timeline posts
router.get(
    "/timeline/:userId",
    authController.verify,
    postsController.getTimeline
);
//get user's all posts  /timeline/ 43:19
router.get(
    "/timeline/all",
    authController.verify,
    postsController.getTimelineAll
);
router.get(
    "/profile/:username",
    authController.verify,
    postsController.getUserPosts
);

module.exports = router;
