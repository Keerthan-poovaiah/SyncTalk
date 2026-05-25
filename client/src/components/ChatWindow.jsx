import { useEffect, useRef, useState } from "react";
import API from "../services/api";
import MessageBubble from "./MessageBubble";

function ChatWindow({
  currentUser,
  selectedChat,
  messages,
  setMessages,
  socket,
}) {
  const [newMessage, setNewMessage] =
    useState("");

  const [isTyping, setIsTyping] =
    useState(false);

  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    socket.on("typing", () => {
      setIsTyping(true);
    });

    socket.on("stop_typing", () => {
      setIsTyping(false);
    });

    return () => {
      socket.off("typing");
      socket.off("stop_typing");
    };
  }, []);

  if (!selectedChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
        <h1 className="text-6xl mb-4">
          💬
        </h1>

        <h2 className="text-3xl font-semibold mb-2">
          Welcome to SyncTalk
        </h2>

        <p className="text-lg">
          Search a user to start chatting
        </p>
      </div>
    );
  }

  const otherUser =
    selectedChat.participants.find(
      (p) => p._id !== currentUser._id
    );

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const res = await API.post(
        "/messages",
        {
          chatId: selectedChat._id,
          message: newMessage,
        }
      );

      socket.emit("send_message", {
        ...res.data,
        chatId: selectedChat._id,
        receiverId: otherUser._id,
      });

      socket.emit("stop_typing", {
        receiverId: otherUser._id,
      });

      setMessages((prev) => {
        const exists = prev.some(
          (msg) => msg._id === res.data._id
        );

        if (exists) return prev;

        return [...prev, res.data];
      });

      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    socket.emit("typing", {
      receiverId: otherUser._id,
    });

    setTimeout(() => {
      socket.emit("stop_typing", {
        receiverId: otherUser._id,
      });
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0b141a]">
      <div className="bg-[#202c33] p-4 border-b border-gray-800 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg">
          {otherUser.username[0].toUpperCase()}
        </div>

        <div>
          <h2 className="text-white font-semibold text-lg">
            {otherUser.username}
          </h2>

          <p className="text-green-400 text-sm">
            {isTyping
              ? "Typing..."
              : "Online"}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            msg={msg}
            currentUser={currentUser}
          />
        ))}

        <div ref={bottomRef}></div>
      </div>

      <div className="p-4 bg-[#202c33] flex gap-3">
        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          onChange={handleTyping}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className="flex-1 p-4 rounded-full bg-[#2a3942] text-white outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-green-500 hover:bg-green-600 px-8 rounded-full text-white font-semibold transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;