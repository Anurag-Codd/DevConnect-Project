import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/ds8nimjln/image/upload/v1738935852/User_drezqk.png",
    },
    username: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    tagline: { type: String },
    bio: { type: String },
    skills: [String],
    social: {
      linkedin: { type: String, match: [/^https?:\/\//, "Invalid URL"] },
      github: { type: String, match: [/^https?:\/\//, "Invalid URL"] },
      twitter: { type: String, match: [/^https?:\/\//, "Invalid URL"] },
      portfolio: { type: String, match: [/^https?:\/\//, "Invalid URL"] },
      youtube: { type: String, match: [/^https?:\/\//, "Invalid URL"] },
    },
    experience: [
      {
        title: { type: String, required: true },
        company: { type: String },
        from: { type: Date, required: true },
        to: { type: Date },
        current: { type: Boolean, default: false },
        description: { type: String },
      },
    ],
    projects: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Project", default: [] },
    ],
    education: [
      {
        school: { type: String, required: true },
        degree: { type: String, required: true },
        fieldOfStudy: { type: String, required: true },
        from: { type: Date, required: true },
        to: { type: Date },
        current: { type: Boolean, default: false },
        description: { type: String },
      },
    ],
    connections: [
      {
        user: { type: String, ref: "User", required: true },
        status: {
          type: String,
          enum: ["sent", "accepted", "requested"],
          default: "sent",
        },
        sentAt: { type: Date, default: Date.now },
        respondedAt: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
