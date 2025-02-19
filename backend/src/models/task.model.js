import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    tasks: [
      {
        title: { type: String, required: true },
        description: { type: String },
        assignedTo: { type: String, ref: "User" },
        status: {
          type: String,
          enum: ["To Do", "In Progress", "Done"],
          default: "To Do",
        },
      },
    ],
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
