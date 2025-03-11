import mongoose from "mongoose";

const { Schema } = mongoose;

const collaborationSchema = new Schema(
  {
    userId: {
      type: String,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    asset: { type: String },
    techStack: {
      type: [String],
      required: true,
    },
    type: {
      type: String,
      enum: ["collaboration"],
      required: true,
    },
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

collaborationSchema.index({ userId: 1, createdAt: -1 });

const Collaboration = mongoose.model("collaboration", collaborationSchema);

export default Collaboration;
