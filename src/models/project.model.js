import mongoose from "mongoose";

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    owner: {
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
    githubRepo: {
      type: String,
      match: [/^https?:\/\//, "Invalid URL"],
    },
    collaborators: [
      {
        type: String,
        ref: "User",
      },
    ],
    taskId: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    status: {
      type: String,
      enum: ["ongoing", "completed", "onhold", "abandoned"],
      default: "ongoing",
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
