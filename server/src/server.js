import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

import http from "http";
import { Server } from "socket.io";

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let onlineUsers = {};

io.on("connection", (socket) => {
  socket.on("join", (userId) => {
    onlineUsers[userId] = socket.id;
  });

  socket.on("send_message", (data) => {
    const receiverSocket =
      onlineUsers[data.receiverId];

    if (receiverSocket) {
      io.to(receiverSocket).emit(
        "receive_message",
        data
      );
    }
  });

  socket.on("typing", (data) => {
    const receiverSocket =
      onlineUsers[data.receiverId];

    if (receiverSocket) {
      io.to(receiverSocket).emit(
        "typing",
        data
      );
    }
  });

  socket.on("stop_typing", (data) => {
    const receiverSocket =
      onlineUsers[data.receiverId];

    if (receiverSocket) {
      io.to(receiverSocket).emit(
        "stop_typing"
      );
    }
  });

  socket.on("disconnect", () => {
    for (let userId in onlineUsers) {
      if (
        onlineUsers[userId] === socket.id
      ) {
        delete onlineUsers[userId];
      }
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});
