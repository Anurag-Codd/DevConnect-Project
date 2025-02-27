import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    userId: { type: String, ref: "User", required: true },
    title: {
      type: String,
      required: function () {
        return this.type === "question";
      },
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["post", "question"],
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    likes: [
      {
        type: String,
        ref: "User",
      },
    ],
    dislikes: [
      {
        user: {
          type: String,
          ref: "User",
        },
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

postSchema.index({ userId: 1, createdAt: -1 });

const Post = mongoose.model("Post", postSchema);

export default Post;
