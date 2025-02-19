import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    postType: {
      type: String,
      required: true,
      enum: ["post", "question"],
      default: "post",
    },
    text: {
      type: String,
      required: true,
    },
    imagesUrl: {
      type: [String],
      maxlength: 4,
      default: [],
    },
    likes: [
      {
        user: { type: String, ref: "User", required: true },
      },
    ],
    dislikes: [
      {
        user: { type: String, ref: "User", required: true },
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

postSchema.index({ user: 1 , createdAt: -1 });

const Post = mongoose.model("Post", postSchema);

export default Post;
