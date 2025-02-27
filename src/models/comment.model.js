import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    userId: {
      type: String,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    refId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    onModel: {
      type: String,
      required: true,
      enum: ["Post", "Question", "Project"],
    },
  },
  { timestamps: true }
);

commentSchema.index({ refId: 1, createdAt: -1 });
commentSchema.index({ parentId: 1, createdAt: -1 });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
