import sanitizeHtml from "sanitize-html";
import Post from "../models/post.model.js";
import { uploader } from "../config/cloudinaryConfig.js";

export const createPost = async (req, res) => {
  const userId = req.id;
  const { text } = req.body;
  const postFiles = req.files;

  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }

  const sanitizedText = sanitizeHtml(text, {
    allowedTags: [],
    allowedAttributes: {},
  });

  let uploadedFiles = [];

  if (postFiles && postFiles.length > 0) {
    try {
      uploadedFiles = await Promise.all(
        postFiles.map((file) => uploader(file))
      );
    } catch (error) {
      return res.status(500).json({ message: "Error uploading files" });
    }
  }

  try {
    const newPost = {
      text: sanitizedText,
      imagesUrl: uploadedFiles.map((file) => file.secure_url),
      user: userId,
    };

    const createdPost = await Post.create(newPost);

    return res.status(201).json({
      message: "Post created successfully",
      post: createdPost,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  const userId = req.id;
  const postId = req.params.id;
  const { text, removeFiles } = req.body;
  const postFiles = req.files;

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.user !== userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  if (!text) {
    return res.status(400).json({ message: "Text is required" });
  }

  const sanitizedText = sanitizeHtml(text, {
    allowedTags: [],
    allowedAttributes: {},
  });

  if (removeFiles && removeFiles.length > 0) {
    try {
      const updatedImages = post.imagesUrl.filter(
        (image) => !removeFiles.includes(image)
      );

      await Promise.all(
        removeFiles.map((file) => {
          const publicId = file.split("/").pop().split(".")[0];
          return destroyer(publicId);
        })
      );

      post.imagesUrl = updatedImages;
      await post.save();
    } catch (error) {
      return res.status(500).json({ message: "Error removing files" });
    }
  }

  let uploadedFiles = [];
  if (postFiles && postFiles.length > 0) {
    try {
      const existingImagesCount = post.imagesUrl.length;
      const newImagesCount = postFiles.length;

      if (existingImagesCount + newImagesCount > 4) {
        return res
          .status(400)
          .json({ message: "Cannot upload more than 4 images" });
      }

      uploadedFiles = await Promise.all(
        postFiles.map((file) => uploader(file))
      );
    } catch (error) {
      return res.status(500).json({ message: "Error uploading files" });
    }
  }

  try {
    const updatedPost = {
      text: sanitizedText,
      imagesUrl: uploadedFiles.map((file) => file.secure_url),
      user: userId,
    };

    const post = await Post.findByIdAndUpdate(postId, updatedPost, {
      new: true,
    });

    return res.status(201).json({
      message: "Post updated successfully",
      post: post,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update post" });
  }
};

export const deletePost = async (req, res) => {
  const userId = req.id;
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (post.imagesUrl && post.imagesUrl.length > 0) {
      await Promise.all(
        post.imagesUrl.map((image) => {
          const publicId = image.split("/").pop().split(".")[0];
          return destroyer(publicId);
        })
      );
    }
    await Comment.find({ post: postId }).deleteMany();
    await post.delete();
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete post" });
  }
};

export const postLike = async (req, res) => {
  const postId = req.params.id;
  const userId = req.id;

  try {
    const user = await Post.findOne({ "$likes.user": userId });
    if (user) {
      await Post.findByIdAndUpdate(postId, {
        $pull: { likes: { user: userId } },
      });
      return res.status(400).json({ message: "removed like" });
    }

    const post = await Post.findByIdAndUpdate(postId, {
      $push: { likes: { user: userId } },
    });

    return res.status(200).json({ message: "liked post", post });
  } catch (error) {}
};

export const postDislike = async (req, res) => {
  const postId = req.params.id;
  const userId = req.id;

  try {
    const user = await Post.findOne({ "$dislikes.user": userId });
    if (user) {
      await Post.findByIdAndUpdate(postId, {
        $pull: { dislikes: { user: userId } },
      });
      return res.status(400).json({ message: "removed dislike" });
    }

    const post = await Post.findByIdAndUpdate(postId, {
      $push: { dislikes: { user: userId } },
    });

    return res.status(200).json({ message: "disliked post", post });
  } catch (error) {
    console.error("Post dislike error:", error);
    return res.status(500).json({ message: "Failed to dislike post" });
  }
};
