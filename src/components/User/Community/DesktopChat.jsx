import React from "react";

const DesktopChat = ({ users, selectedUser, handleUserSelection, messages, newMessage, setNewMessage, sendMessage }) => {
    return (
        <div className="h-[98%] flex">
            {/* Sidebar (User List) */}
            <div className="w-1/4 bg-white p-4 border-r overflow-y-auto overflow-x-hidden">
                <h2 className="text-xl font-bold mb-4">Chats</h2>
                <div className="space-y-3">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => handleUserSelection(user)}
                            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer  ${selectedUser?.id === user.id ? "bg-gray-200" : "hover:bg-gray-100"
                                }`}
                        >
                            <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                            <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Section */}
            <div className="flex-1 bg-white flex flex-col">
                {/* Chat Header */}
                <div className="flex items-center p-4 bg-gray-100 shadow-sm border-b justify-between">
                    <div className="flex items-center space-x-3">
                        <img
                            src="https://via.placeholder.com/40"
                            alt="User Profile"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <p className="font-medium">{selectedUser?.name || "User Name"}</p>
                            <p className="text-sm text-gray-500">Last seen at 9:00 PM</p>
                        </div>

                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <i class="fa-solid fa-video"></i>
                        </button>

                        <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <i class="fa-solid fa-phone"></i>
                        </button>
                        <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-grow p-4 overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.user === "You" ? "justify-end" : ""}`}>
                            <div
                                className={`max-w-xs p-3 rounded-lg shadow ${msg.user === "You" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                                    }`}
                            >
                                <p>{msg.text}</p>
                                <p className="text-xs mt-1 text-gray-500 text-right">{msg.time}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Message Input */}
                <div className="p-4 bg-gray-100 border-t flex items-center space-x-3">
                    <button className="flex items-center justify-center w-10 h-10 text-gray-500 hover:bg-gray-200 rounded-full">
                        <i className="fa-solid fa-smile"></i>
                    </button>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 p-2 border rounded-lg focus:outline-none"
                    />
                    <button className="flex items-center justify-center w-5 h-10 text-gray-500 hover:bg-gray-200 rounded-full">
                        <i className="fa-solid fa-paperclip"></i>
                    </button>
                    <button className="flex items-center justify-center w-5 h-10 text-gray-500 hover:bg-gray-200 rounded-full">
                        <i class="fa-solid fa-camera-retro"></i>
                    </button>
                    <button
                        onClick={sendMessage}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DesktopChat;
