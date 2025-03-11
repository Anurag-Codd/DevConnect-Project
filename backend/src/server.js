import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import connectDB from "./lib/mongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URI, credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`server is connected to Port : ${PORT}`);
  } catch (error) {
    console.error(error);
  }
})