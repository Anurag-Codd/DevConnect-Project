import mongoose from "mongoose";

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    admin: {
      type: String,
      ref: "User",
      required: true,
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
      type: [String],
      required: true,
    },
    githubRepo: {
      type: String,
      match: [/^https?:\/\//, "Invalid URL"],
    },
    members: [
      {
        type: String,
        ref: "User",
      },
    ],
    tasks: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    status: {
      type: String,
      enum: ["pending", "on-hold", "abandoned", "in-progress", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
