import Post from "../models/post.js";
import User from "../models/user.js";

/* CREATE POST */
export const createPost = async (req, res) => {

    try {
        const { userId, firstName, lastName, location, description } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.profilePicturePath,
            picturePath,
            likes: {},
            comments: [],
        });
        await newPost.save();

        const posts = await Post.find();

        res.status(201).json(posts);
    } catch(error) {
        res.status(409).json({error: error.message});
    }
}

/* GET POSTS */
export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch(error) {
        res.status(404).json({error: error.message});
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userID } = req.params;

        const posts = await Post.find({ userId});
        res.status(200).json(posts);
    } catch(error) {
        res.status(404).json({error: error.message});
    }
}

/* UPDATE POST */
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes},
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch(error) {
        res.status(404).json({error: error.message});
    }
}