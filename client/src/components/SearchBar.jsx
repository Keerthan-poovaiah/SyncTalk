import { useState } from "react";
import API from "../services/api";

function SearchBar({
  currentUser,
  fetchChats,
  openChat,
}) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const searchUsers = async (value) => {
    setQuery(value);

    if (!value.trim()) {
      setUsers([]);
      return;
    }

    try {
      const res = await API.get(
        `/users/search?query=${value}`
      );

      const filtered = res.data.filter(
        (user) => user._id !== currentUser._id
      );

      setUsers(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  const createChat = async (userId) => {
    try {
      const res = await API.post("/chats", {
        userId,
      });

      await fetchChats();

      openChat(res.data);

      setUsers([]);
      setQuery("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 border-b border-gray-800 relative">
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) =>
          searchUsers(e.target.value)
        }
        className="w-full p-3 rounded-lg bg-[#202c33] text-white outline-none"
      />

      {users.length > 0 && (
        <div className="absolute left-3 right-3 mt-2 bg-[#202c33] rounded-lg overflow-hidden shadow-lg z-50">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => createChat(user._id)}
              className="p-3 hover:bg-[#2a3942] text-white cursor-pointer flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                {user.username[0].toUpperCase()}
              </div>

              <span>{user.username}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;