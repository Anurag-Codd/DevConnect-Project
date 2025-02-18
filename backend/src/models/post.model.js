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
      maxlength: 4,
    },
    likes: [
      {
        user: { type: String, ref: "User" },
      },
    ],
    dislikes: [
      {
        user: { type: String, ref: "User" },
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
