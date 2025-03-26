import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URI, methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log("Socket connected", socket.id);

  socket.on("likePost", (data) => {
    io.emit("updateLike", data);
  });

  socket.on("dislikePost", (data) => {
    io.emit("updateDislike", data);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected", socket.id);
  });
});

export { io };
