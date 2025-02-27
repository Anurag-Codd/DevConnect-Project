import mongoose from "mongoose";

const { Schema } = mongoose;

const projectPostSchema = new Schema(
  {
    userId: {
      type: String,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    techStack: {
      Skills: [String],
      required: true,
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
        user: { type: String, ref: "User" },
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

projectPostSchema.index({ userId: 1, createdAt: -1 });

const ProjectPost = mongoose.model("ProjectPost", projectPostSchema);

export default ProjectPost;
