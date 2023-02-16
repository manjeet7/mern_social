const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            username: user.username,
            isAdmin: user.isAdmin,
            coverPicture: user.coverPicture,
            profilePicture: user.profilePicture,
            _id: user._id,
        },
        "akxpa4152",
        { expiresIn: 60 * 60 * 60 } // 1 hour
    );
};
const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            username: user.username,
            isAdmin: user.isAdmin,
            coverPicture: user.coverPicture,
            profilePicture: user.profilePicture,
            _id: user._id,
        },
        "akxpa4152e"
    );
};

module.exports = { generateAccessToken, generateRefreshToken };
