function MessageBubble({
  msg,
  currentUser,
}) {
  const senderId =
    typeof msg.senderId === "object"
      ? msg.senderId._id
      : msg.senderId;

  const isSender =
    senderId === currentUser._id;

  return (
    <div
      className={`flex mb-4 ${
        isSender
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`px-4 py-3 rounded-2xl text-white max-w-[60%] wrap-break-words ${
          isSender
            ? "bg-green-600 rounded-br-none"
            : "bg-[#202c33] rounded-bl-none"
        }`}
      >
        {msg.message}
      </div>
    </div>
  );
}

export default MessageBubble;