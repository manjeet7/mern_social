const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        file: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
        uploadTime: {
            type: Date,
            default: Date.now,
        },
        desc: {
            type: String,
            max: 500,
        },
        media: {
            type: String,
        },
        uploadtype: {
            type: String,
            enum: ["local", "online"],
            defualt: "local",
        },
        likes: {
            counter: {
                type: Number,
                default: 0,
            },
            likedby: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
            ],
        },
        dislikes: {
            type: Number,
            default: 0,
        },
    },

    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
