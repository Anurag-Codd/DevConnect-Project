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
      console.error("File upload error:", error);
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
    console.error("Post creation error:", error);
    return res.status(500).json({ message: "Failed to create post" });
  }
};

export const postLike = async (req, res) => {
  const postId = req.params.id;
  const userId = req.id;

  try {
    
  } catch (error) {
    
  }
};
