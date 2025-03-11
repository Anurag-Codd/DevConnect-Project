import { destroyer, uploader } from "../lib/cloudinaryConfig.js";
import User from "../models/user.model.js";

export const createAccount = async (req, res) => {
  const { username, email, uid } = req.body;

  if (!username || !email || !uid) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existingUser = await User.findOne({ _id: uid });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await User.create({
      _id: uid,
      email,
      username,
    });

    return res.status(201).json({ success: "Signup successful", user });
  } catch (error) {
    console.error("Signup error:", error);
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
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

export const userData = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(401).json({ error: "unauthorized access" });
    }
    const user = await User.findById(userId);

    if (!user) {
      console.log("here", user);
      return res.status(404).json({ error: "user not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "somthing went wrong" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { tagline, bio, skills, social, experience, education } = JSON.parse(
      req.body
    );
    const avatar = req.file;
    const userId = req.id;

    if (
      !tagline ||
      !bio ||
      !skills?.length ||
      !social ||
      !experience?.length ||
      !education?.length
    ) {
      return res.status(400).json({ message: "Provide something to update" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    let avatarUrl = user.avatar;
    if (avatar) {
      if (user.avatar) {
        await destroyer(user.avatar.split("/").pop().split(".")[0]);
      }
      const uploadResult = await uploader(avatar);
      avatarUrl = uploadResult.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { tagline, skills, bio, social, experience, education, avatar: avatarUrl },
      { new: true }
    ).select("-password");

    return res
      .status(200)
      .json({ message: "Profile updated successfully.", updatedUser });
  } catch (error) {
    console.error("Update Profile Error:", error.message);
    return res.status(500).json({ message: "Internal server issue." });
  }
};

export const sendConnectionRequest = async (req, res) => {
  const userId = req.id;
  const { receiverId } = req.body;

  if (userId === receiverId) {
    return res.status(400).json({ message: "Cannot send request to self." });
  }

  try {
    const user = await User.findById(userId);
    const receiver = await User.findById(receiverId);

    if (!user || !receiver) {
      return res.status(404).json({ message: "User not found." });
    }

    const userConnection = user.connections.find(
      (conn) => conn.user === receiverId
    );
    const receiverConnection = receiver.connections.find(
      (conn) => conn.user === userId
    );

    if (userConnection || receiverConnection) {
      return res
        .status(400)
        .json({ message: "Connection request already sent." });
    }

    user.connections.push({ user: receiverId, status: "requested" });
    receiver.connections.push({ user: userId, status: "pending" });

    await user.save();
    await receiver.save();
  } catch (error) {
    return res.status(500).json({ message: "Internal server issue." });
  }
};

export const acceptConnectionRequest = async (req, res) => {
  const userId = req.id;
  const { senderId } = req.body;

  try {
    const user = await User.findById(userId);
    const sender = await User.findById(senderId);

    if (!user || !sender) {
      return res.status(404).json({ message: "User not found." });
    }

    const userConnection = user.connections.find(
      (conn) => conn.user === senderId && conn.status === "requested"
    );

    const senderConnection = sender.connections.find(
      (conn) => conn.user === userId && conn.status === "pending"
    );

    if (!userConnection || !senderConnection) {
      return res
        .status(400)
        .json({ message: "No pending connection request found." });
    }

    userConnection.status = "accepted";
    senderConnection.status = "accepted";

    await user.save();
    await sender.save();

    return res
      .status(200)
      .json({ message: "Connection request accepted successfully." });
  } catch (error) {
    console.error("Accept Connection Request Error:", error);
    return res.status(500).json({ message: "Internal server issue." });
  }
};

export const rejectConnectionRequest = async (req, res) => {
  try {
    const userId = req.id;
    const { senderId } = req.body;

    const user = await User.findById(userId);
    const sender = await User.findById(senderId);

    if (!user || !sender) {
      return res.status(404).json({ message: "User not found." });
    }

    const userConnection = user.connections.find(
      (conn) => conn.user === senderId && conn.status === "requested"
    );

    const senderConnection = sender.connections.find(
      (conn) => conn.user === userId && conn.status === "pending"
    );

    if (!userConnection || !senderConnection) {
      return res
        .status(400)
        .json({ message: "No pending connection request found." });
    }

    user.connections = user.connections.filter(
      (conn) => conn.user !== senderId
    );
    sender.connections = sender.connections.filter(
      (conn) => conn.user !== userId
    );

    await user.save();
    await sender.save();

    return res
      .status(200)
      .json({ message: "Connection request rejected successfully." });
  } catch (error) {
    console.error("Reject Connection Request Error:", error);
    return res.status(500).json({ message: "Internal server issue." });
  }
};
