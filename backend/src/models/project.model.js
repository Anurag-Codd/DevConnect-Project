import mongoose from "mongoose";

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    techStack: {
      title: { type: String },
      Skills: [String],
      required: true,
    },
    githubRepo: {
      type: String,
      match: [/^https?:\/\//, "Invalid URL"],
    },
    owner: {
      type: String,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: String,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
