import SearchBar from "./SearchBar";

function Sidebar({
  currentUser,
  userChats,
  fetchChats,
  openChat,
  selectedChat,
}) {
  return (
    <div className="w-[30%] bg-[#111b21] border-r border-gray-800 flex flex-col">
      <div className="bg-[#202c33] p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-bold">
          {currentUser.username[0].toUpperCase()}
        </div>

        <div>
          <h1 className="text-white font-semibold text-lg">
            {currentUser.username}
          </h1>

          <p className="text-green-400 text-sm">
            Online
          </p>
        </div>
      </div>

      <SearchBar
        currentUser={currentUser}
        fetchChats={fetchChats}
        openChat={openChat}
      />

      <div className="overflow-y-auto flex-1">
        {userChats.map((chat) => {
          const otherUser = chat.participants.find(
            (p) => p._id !== currentUser._id
          );

          return (
            <div
              key={chat._id}
              onClick={() => openChat(chat)}
              className={`p-4 cursor-pointer border-b border-gray-800 transition ${
                selectedChat?._id === chat._id
                  ? "bg-[#2a3942]"
                  : "hover:bg-[#202c33]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                  {otherUser?.username[0].toUpperCase()}
                </div>

                <div className="flex-1">
                  <h2 className="text-white font-medium">
                    {otherUser?.username}
                  </h2>

                  <p className="text-gray-400 text-sm truncate">
                    {chat.lastMessage || "Start chatting"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;