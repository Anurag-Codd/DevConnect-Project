import sanitizeHtml from "sanitize-html";
import Post from "../models/post.model.js";
import { destroyer, uploader } from "../lib/cloudinaryConfig.js";
import Comment from "../models/comment.model.js";
import Question from "../models/question.model.js";
import Collaboration from "../models/collaboration.model.js";
import User from "../models/user.model.js";

export const allPost = async (req, res) => {
  const userId = req.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const connectionIds = user.connections
      .filter((connection) => connection.status === "accepted")
      .map((connection) => connection.user);

    const Posts = await Post.find({
      userId: { $in: [userId, ...connectionIds] },
    })
      .populate("userId", "username tagline")
      .lean();
    const Questions = await Question.find({
      userId: { $in: [userId, ...connectionIds] },
    })
      .populate("userId", "username tagline")
      .lean();
    const CollabPost = await Collaboration.find({
      userId: { $in: [userId, ...connectionIds] },
    })
      .populate("userId", "username tagline")
      .lean();
      
    return res.status(200).json({
      posts: Posts,
      questions: Questions,
      collaborations: CollabPost,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createPost = async (req, res) => {
  try {
    const userId = req.id;
    const { title, content, type, tags, techStack } = JSON.parse(
      JSON.stringify(req.body)
    );
    const asset = req.file;

    if (!content) {
      return res.status(400).json({ error: "Missing post details" });
    }
    let assetUrl = null;
    if (asset) {
      const result = await uploader(asset);
      assetUrl = result.secure_url;
    }

    let postData = { userId, content, asset: assetUrl, type };

    if (type === "post") {
      const post = await Post.create(postData);
      return res.status(201).json({ success: "Post created", post });
    }

    if (type === "question") {
      postData = { ...postData, title, tags: tags || [] };
      const question = await Question.create(postData);
      return res.status(201).json({ success: "Question created", question });
    }

    if (type === "collaboration") {
      postData = { ...postData, title, techStack: techStack || [] };
      const collaboration = await Collaboration.create(postData);
      return res
        .status(201)
        .json({ success: "Collaboration post created", collaboration });
    }

    return res.status(400).json({ error: "Invalid post type" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  const userId = req.id;
  const postId = req.params.id;

  try {
    let post =
      (await Post.findById(postId)) ||
      (await Question.findById(postId)) ||
      (await Collaboration.findById(postId));

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    if (post.asset) {
      const publicId = image.split("/").pop().split(".")[0];
      return destroyer(publicId);
    }

    await Comment.find({ post: postId }).deleteMany();
    await post.delete();

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete post" });
  }
};

export const addLike = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.id;

    let post =
      (await Post.findById(postId)) ||
      (await Question.findById(postId)) ||
      (await Collaboration.findById(postId));
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const likeIndex = post.likes.findIndex((like) => like.user === userId);
    if (likeIndex !== -1) {
      post.likes.slice(likeIndex, 1);
      post.save();
      return res.status(200).json({ message: "Removed like", post });
    }

    post.likes.push({ user: userId });
    await post.save();

    return res.status(200).json({ message: "Liked post", post });
  } catch (error) {
    console.error("Post Like Error:", error);
    return res.status(500).json({ message: "Internal server issue." });
  }
};

export const addDislike = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.id;

    const post = await Post.findById(postId);

    const dislikeIndex = post.likes.findIndex((like) => like.user === userId);
    if (dislikeIndex !== -1) {
      post.dislikes.slice(dislikeIndex, 1);
      post.save();
      return res.status(200).json({ message: "Removed dislike", post });
    }

    post.dislikes.push({ user: userId });
    await post.save();

    return res.status(200).json({ message: "Disliked post", post });
  } catch (error) {
    console.error("Post Dislike Error:", error);
    return res.status(500).json({ message: "Internal server issue." });
  }
};

export const addComment = async (req, res) => {
  try {
    const userId = req.id;
    const postId = req.params.id;
    const { content, parentId } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Text is required" });
    }

    const newComment = await Comment.create({
      text,
      userId,
      refId: postId,
      parentId: parentId || null,
    });

    return res.status(201).json({
      message: "Comment created successfully",
      comment: newComment,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create comment" });
  }
};

export const removeComment = async (req, res) => {
  const userId = req.id;
  const commentId = req.params.id;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Comment.find({ parentId: commentId }).deleteMany();
    await comment.delete();
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete comment" });
  }
};
