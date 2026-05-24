import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import API from "../services/api";
import socket from "../socket";

function Chat() {
  const [selectedChat, setSelectedChat] =
    useState(null);

  const [messages, setMessages] =
    useState([]);

  const [userChats, setUserChats] =
    useState([]);

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    if (currentUser?._id) {
      socket.emit("join", currentUser._id);
    }

    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const res = await API.get("/chats");

      setUserChats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openChat = async (chat) => {
    setSelectedChat(chat);

    try {
      const res = await API.get(
        `/messages/${chat._id}`
      );

      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      const incomingChatId =
        typeof data.chatId === "object"
          ? data.chatId._id
          : data.chatId;

      if (
        selectedChat &&
        incomingChatId === selectedChat._id
      ) {
        setMessages((prev) => {
          const exists = prev.some(
            (msg) => msg._id === data._id
          );

          if (exists) return prev;

          return [...prev, data];
        });
      }

      fetchChats();
    });

    return () => {
      socket.off("receive_message");
    };
  }, [selectedChat]);

  return (
    <div className="h-screen flex bg-[#0b141a]">
      <Sidebar
        currentUser={currentUser}
        userChats={userChats}
        fetchChats={fetchChats}
        openChat={openChat}
        selectedChat={selectedChat}
      />

      <ChatWindow
        currentUser={currentUser}
        selectedChat={selectedChat}
        messages={messages}
        setMessages={setMessages}
        socket={socket}
      />
    </div>
  );
}

export default Chat;