const express = require("express");
const compression = require("compression");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users"); //"./routes/users"
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const frienRoute = require("./routes/friend");
const ConversationRoute = require("./routes/conversation");
const MessageRoute = require("./routes/message");
const multer = require("multer");
const sharp = require("sharp");
const ffmpeg = require("ffmpeg");
const path = require("path");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const authController = require("./controllers/auth");
const cloudinary = require("cloudinary");
const app = express();
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 1000, // Limit each IP to 1000 requests per `window` (here, per 1 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

dotenv.config();
// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
//     console.log("Mongo Connected")
// });
require("./config/db");
// compress all responses
app.use(compression());
// Apply the rate limiting middleware to all requests
app.use(limiter);
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("common"));

cloudinary.config({
    cloud_name: process.env.CLOUDNAIRY_NAME,
    api_key: process.env.CLOUNAIRY_API,
    api_secret: process.env.CLOUDNAIRY_SECRET,
});

const UPLOAD_PATH = path.join(__dirname, "public/images");
const allowedMedia = [".png", ".jpg", ".jpeg", ".gif"];
const allowedMultiMedia = [
    ".mpg",
    ".mpeg",
    ".avi",
    ".wmv",
    ".mov",
    ".rm",
    ".ram",
    ".swf",
    ".flv",
    ".ogg",
    ".webm",
    ".mp4",
];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_PATH);
    },
    filename: (req, file, cb) => {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.fieldname + '-' + uniqueSuffix);
        cb(null, file.originalname);
    },
});
const fileSize = {
    files: 1, // allow only 1 file per request
    fileSize: 5 * 1024 * 1024, // 2MB
};

const uploadFilter = (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (
        !allowedMedia.includes(ext?.toLowerCase()) &&
        !allowedMultiMedia.includes(ext?.toLowerCase())
    ) {
        return cb(new Error("Only images/videos are allowed"));
    }
    return cb(null, true);
};
const upload = multer({
    storage: storage,
    fileFilter: uploadFilter,
    limits: fileSize,
});
app.post(
    "/api/upload",
    authController.verify,
    upload.single("file"),
    async (req, res) => {
        try {
            const { file } = req.body;
            console.log(file);
            // Media compress
            let ext = path.extname(file.originalname);
            if (allowedMedia.includes(ext?.toLowerCase())) {
                if (!file) {
                    return res
                        .status(400)
                        .json({ success: false, message: "file not supplied" });
                }
                const newFilePath = path.join(
                    UPLOAD_PATH,
                    "/compressed",
                    file.originalname
                );
                // reduce 50% file size
                await sharp(file.path)
                    .resize()
                    .jpeg({ quality: 50 })
                    .toFile(newFilePath);
            }
            // multemedia compress
            if (allowedMultiMedia.includes(ext?.toLowerCase())) {
                try {
                    const processMultimedia = new ffmpeg(file.path);
                    processMultimedia.then(
                        function (video) {
                            const newFilePath = path.join(
                                UPLOAD_PATH,
                                "/compressed",
                                "/video",
                                file.originalname
                            );
                            video.save(newFilePath, function (error, filee) {
                                if (!error)
                                    console.log("Video compressed: " + filee);
                            });
                        },
                        function (err) {
                            console.log("Error: " + err);
                        }
                    );
                } catch (e) {
                    console.log(e.code);
                    console.log(e.msg);
                }
            }

            return res.status(200).json({ status: "success" });
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .json({ status: "failed", message: err.message });
        }
    }
);

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/friend", frienRoute);
app.use("/api/message", MessageRoute);
app.use("/api/conversation", ConversationRoute);
app.get("/", (req, res) => {
    res.send("Welcome to homepage");
});
app.listen(process.env.PORT || 3001, process.env.HOST || "localhost", () => {
    console.log(
        `Backend Server Running at http://${process.env.HOST}:${process.env.PORT}`
    );
});
