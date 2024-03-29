const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            min: 3,
            max: 20,
        },

        email: {
            type: String,
            max: 50,
            unique: true,
        },
        mobile: {
            type: String,
            required: true,
            max: 12,
            unique: true,
        },

        password: {
            type: String,
            required: true,
            min: 6,
        },

        profilePicture: {
            type: String,
            default: "",
        },

        coverPicture: {
            type: String,
            default: "",
        },

        followers: {
            type: Array,
            default: [],
        },

        followings: {
            type: Array,
            default: [],
        },

        isAdmin: {
            type: Boolean,
            default: false,
        },
        //description
        desc: {
            type: String,
            max: 50,
        },

        city: {
            type: String,
            max: 50,
        },

        gender: {
            type: String,
            enum: ["M", "F"],
        },
        jwtToken: {
            type: String,
        },

        from: {
            type: String,
            max: 50,
        },

        relationship: {
            type: Number,
            enum: [1, 2, 3],
        },
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "friend",
            },
        ],
        followers: [],
        following: [],
    },

    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
