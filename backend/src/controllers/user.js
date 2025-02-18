import { destroyer, uploader } from "../config/cloudinaryConfig.js";
import User from "../models/user.model.js";

export const checkUsername = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }
    return res.status(200).json({ message: "Username available" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createAccount = async (req, res) => {
  const { username, email, uid } = req.body;

  if (!username || username.length < 5 || !email || !uid) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const user = await User.create({
      username,
      email,
      _id: uid,
      name: username,
    });
    return res.status(201).json({ mesaage: "signup successful", user });
  } catch (error) {
    console.log("signup", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, uid } = req.body;

  if (!email || !uid) {
    return res.status(400).json({ message: "Missing required fileds" });
  }

  try {
    const user = User.findOne({ _id: uid, email });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json({ message: "user found", user });
  } catch (error) {
    console.log("login", error.message);
    return res.staus(500).json({ message: "internal server error" });
  }
};


export const updateProfile = async (req, res) => {
  const { name, skills, bio } = JSON.parse(req.body.userData);
  const avatar = req.file;
  const userId = req.id;

  if (!name || !skills || !bio || !avatar) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const profileData = {
      name,
      skills,
      bio,
    };

    if (avatar) {
      if (user.avatar) {
        const publicId = user.avatar.split("/").pop().split(".")[0];
        await destroyer(publicId);
      }

      const cloudUpload = await uploader(avatar);
      profileData.avatar = cloudUpload.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, profileData, {
      new: true,
    });

    return res.status(200).json({
      message: "User profile updated successfully.",
      updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Error:", error.message);
    return res.status(500).json({ message: "Internal server issue." });
  }
};