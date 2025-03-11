import mongoose from "mongoose";

const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    userId: { type: String, ref: "User", required: true },
    title: String,
    content: {
      type: String,
      required: true,
    },
    asset: { type: "String" },
    tags: [String],
    type: {
      type: String,
      enum: "question",
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

questionSchema.index({ userId: 1, createdAt: -1 });

const Question = mongoose.model("Question", questionSchema);

export default Question;
