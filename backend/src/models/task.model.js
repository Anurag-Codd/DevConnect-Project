import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    Content: { type: "String" },
    assignedTo: {
      type: String,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["pending", "on-hold", "in-progress", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
