import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    Content: { type: "String" },
    assignedTo: {
      type: String,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "InProgress", "OnHold", "Done"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
