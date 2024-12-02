import React from "react";

const MobileChat = ({
    users,
    selectedUser,
    handleUserSelection,
    messages,
    newMessage,
    setNewMessage,
    sendMessage,
    backToUserList,
    isSidebarVisible,
    toggleSidebarVisibility,
}) => {
    return (
        <div className="flex flex-col h-screen sm:flex-row">
            {/* Sidebar (User List) */}
            <div
                className={`fixed top-0 left-0 w-full sm:w-1/3 lg:w-1/4 h-full bg-white z-10 p-4 border-r transition-transform transform ${
                    isSidebarVisible ? "translate-x-0" : "-translate-x-full"
                } sm:translate-x-0`}
            >
                <h2 className="text-xl font-bold mb-4 mt-10">Chats</h2>
                <div className="space-y-3">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => {
                                handleUserSelection(user);
                                if (window.innerWidth < 640) toggleSidebarVisibility(); // Hide sidebar on mobile
                            }}
                            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                                selectedUser?.id === user.id
                                    ? "bg-gray-200"
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                            <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-gray-500 truncate">
                                    {user.lastMessage}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Section */}
            <div className="flex-1 bg-white flex flex-col overflow-hidden">
                {/* Chat Header */}
                <div className="flex items-center p-4 bg-gray-100 shadow-sm border-b">
                    {selectedUser && (
                        <>
                            <button
                                onClick={() => {
                                    backToUserList();
                                    if (window.innerWidth < 640) toggleSidebarVisibility();
                                }}
                                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center sm:hidden"
                            >
                                <i className="fa-solid fa-arrow-left"></i>
                            </button>
                            <div className="flex items-center ml-4">
                                <img
                                    src="https://via.placeholder.com/40"
                                    alt="User"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="ml-2">
                                    <p className="font-medium">{selectedUser.name}</p>
                                    <p className="text-xs text-gray-500">
                                        Last seen 10 minutes ago
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                    {!selectedUser && (
                        <button
                            onClick={toggleSidebarVisibility}
                            className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center sm:hidden"
                        >
                            <i className="fa-solid fa-bars"></i>
                        </button>
                    )}
                </div>

                {/* Messages */}
                <div className="flex-grow p-4 overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${
                                msg.user === "You" ? "justify-end" : "justify-start"
                            }`}
                        >
                            <div
                                className={`max-w-xs p-3 rounded-lg ${
                                    msg.user === "You"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-800"
                                }`}
                            >
                                <p>{msg.text}</p>
                                <p className="text-xs text-right text-gray-400">{msg.time}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Message Input Section */}
                <div className="bg-gray-100 p-1 border-t flex items-center space-x-2 sm:space-x-4">
                    <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <i className="fa-solid fa-smile"></i>
                    </button>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message"
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <i className="fa-solid fa-paperclip"></i>
                    </button>
                    <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <i className="fa-solid fa-camera-retro"></i>
                    </button>
                    <button
                        onClick={sendMessage}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-400 active:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileChat;
