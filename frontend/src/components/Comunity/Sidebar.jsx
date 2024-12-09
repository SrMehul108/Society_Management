import React, { useState } from "react";

const Sidebar = ({ onSelectName }) => {
  const [users, setUsers] = useState([
    { id: 1, name: "Michael John", message: "Hi, John! How are you doing?", time: "10:27", isTyping: false },
    { id: 2, name: "Jenny Wilson", message: "Hello, Jenny", time: "7:00", isTyping: false },
    { id: 3, name: "Community", message: "Hello...", time: "9:20", isTyping: false },
    { id: 4, name: "Esther Howard", message: "Hello, Esther", time: "10:27", isTyping: false },
    { id: 5, name: "Cody Fisher", message: "Thank you for your order!", time: "7:00", isTyping: false },
  ]);

  const [search, setSearch] = useState("");

  // Function to handle name click
  const handleClickName = (id) => {
    // Update the "isTyping" status of the selected user
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? { ...user, isTyping: true } // Set "isTyping" for clicked user
          : { ...user, isTyping: false } // Reset "isTyping" for others
      )
    );

    // Trigger parent action for header
    const selectedUser = users.find((user) => user.id === id);
    onSelectName(selectedUser.name);
  };

  // Filter users based on search input
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-90 bg-white border-r h-full flex flex-col">
      {/* Search Bar */}
      <div className="p-3 ">
        <h2 className="font-bold text-2xl mb-2">Chat</h2>
        <input
          type="text"
          placeholder="Search Here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            onClick={() => handleClickName(user.id)} // Handle click
            className={`p-4  flex items-center cursor-pointer hover:bg-gray-100 ${
              user.isTyping ? "bg-gray-50" : ""
            }`}
          >
            {/* Profile Picture */}
            <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 mr-4">
              {/* Replace with actual image */}
              <img
                src={`https://via.placeholder.com/150?text=${user.name[0]}`}
                alt={user.name}
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            {/* User Details */}
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">{user.name}</h3>
              <p
                className={`text-sm ${
                  user.isTyping ? "text-blue-500 font-semibold" : "text-gray-500"
                } truncate`}
              >
                {user.isTyping ? "Typing..." : user.message}
              </p>
            </div>

            {/* Timestamp */}
            <div className="text-sm text-gray-400">{user.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
