import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    imagesUrl: {
      type: [String],
    },
    likes: [
      {
        user: { type: String, ref: "User" },
      },
    ],
    comments: [
      {
        user: { type: String, ref: "User" },
        text: { type: String, required: true },
      },
    ],
    user: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
