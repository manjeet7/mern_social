const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema(
    {
        requester: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        reciepient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        status: {
            type: Number,
            enum: [0, 1, 2, 3],
        },
    },

    { timestamps: true }
);

module.exports = mongoose.model("friend", friendSchema);
