const Post = require("../models/post");
const User = require("../models/user");
const cloudinary = require("cloudinary");

const createPost = async (req, res) => {
    console.log("file is ", req.file);
    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path);

        const newPost = new Post({
            username: req.user.username,
            userId: req.user._id,
            file: {
                url: result.secure_url,
                public_id: result.public_id,
            },
            uploadTime: Date.now(),
            desc: req.body.desc,
            media: req.file.mimetype,
        });
        const posts = await newPost.save();
        console.log("posts ", posts);
        res.status(200).json({
            data: posts,
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId == req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("post has been updated");
        } else {
            res.status(403).json("you can only update your own post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId == req.body.userId) {
            await post.deleteOne({ $set: req.body });
            res.status(200).json("post has been deleted");
        } else {
            res.status(403).json("you can only delete your own post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// const likePost = async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//         if (!post.likes.includes(req.body.userId)) {
//             await post.updateOne({ $push: { likes: req.body.userId } });
//             res.status(200).json("post has been liked");
//         } else {
//             await post.updateOne({ $pull: { likes: req.body.userId } });
//             res.status(200).json("post has been disliked");
//         }
//     } catch (err) {
//         res.status(500).json(err);
//     }
// };

const getPost = async (req, res) => {
    try {
        const posts = await Post.find().lean();
        res.status(200).json({
            data: posts,
        });
    } catch (err) {
        res.status(500).json(err + " " + req.params.id);
    }
};
const getTimeline = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
        res.status(500).json(err);
    }
};
const getTimelineAll = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({});
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
        res.status(500).json(err);
    }
};
const getUserPosts = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
};

const likePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.body.id);
        const update = await post.update({
            $set: { likes: { counter: counter + 1 } },
            $push: { likes: { likedby: req.user._id } },
        });
        res.status(201);
        res.json({
            data: update,
        });
    } catch (error) {
        res.status(500);
        res.json(error);
    }
};

module.exports = {
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPost,
    getTimeline,
    getTimelineAll,
    getUserPosts,
    // getNews,
};
