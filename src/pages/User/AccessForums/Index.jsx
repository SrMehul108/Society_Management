import React, { useState } from "react";

const AccessForms = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "Michael John", lastMessage: "Hi, John! How are you?", active: false },
        { id: 2, name: "Elizabeth Sarah", lastMessage: "Thank you for your order!", active: false },
        { id: 3, name: "Jenny Wilson", lastMessage: "Hello, Jenny", active: false },
        { id: 4, name: "Arlene McCoy", lastMessage: "Hi there, how are you?", active: true },
        { id: 5, name: "Esther Howard", lastMessage: "Hello, Esther", active: false },
        { id: 6, name: "Cody Fisher", lastMessage: "Thank you for your order!", active: false },
    ]);

    const [messages, setMessages] = useState([
        { user: "Arlene McCoy", text: "Hi there, how are you?", time: "9:20" },
        { user: "Arlene McCoy", text: "I have to travel a long distance soon.", time: "9:22" },
        { user: "You", text: "I’ll be there shortly. Please wait!", time: "9:30" },
    ]);

    const [selectedUser, setSelectedUser] = useState(users.find((user) => user.active));
    const [newMessage, setNewMessage] = useState("");
    const [showChat, setShowChat] = useState(false); // Toggle between chat and user list for small screens

    // Handle user selection
    const handleUserSelection = (user) => {
        setSelectedUser(user);
        setMessages([
            { user: user.name, text: "Sample message for this chat.", time: "9:00" },
        ]);
        setShowChat(true); // Show chat on small screens
    };

    // Handle sending a message
    const sendMessage = () => {
        if (newMessage.trim() !== "") {
            const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            setMessages([...messages, { user: "You", text: newMessage, time }]);
            setNewMessage("");
        }
    };

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (option) => {
        console.log(`${option} clicked`);
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col md:flex-row h-full bg-gray-100">
            {/* Sidebar */}
            <div
                className={`w-full md:w-1/4 bg-white p-4 border-r transform md:translate-x-0 ${showChat ? "translate-x-[-100%]" : "translate-x-0"
                    } transition-transform duration-300 ease-in-out`}
            >
                <h2 className="text-xl font-bold mb-4">Chats</h2>
                <div className="space-y-3">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => handleUserSelection(user)}
                            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${selectedUser?.id === user.id ? "bg-gray-200" : "hover:bg-gray-100"
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
            <div
                className={`flex-1 flex flex-col transform md:translate-x-0 ${showChat ? "translate-x-0" : "translate-x-full"
                    } transition-transform duration-300 ease-in-out`}
            >
                {/* Chat Header */}
                <div className="flex items-center justify-between p-4 bg-white shadow-sm border-b">
                    <div className="flex items-center space-x-3">
                        {/* Back Button for Mobile */}
                        <button
                            className="md:hidden flex items-center justify-center w-10 h-10 text-gray-500 hover:bg-gray-100 rounded-full"
                            onClick={() => setShowChat(false)}
                        >
                            <i className="fa-solid fa-arrow-left"></i>
                        </button>
                        <img
                            src="https://via.placeholder.com/40"
                            alt="User Profile"
                            className="w-10 h-10 rounded-full"
                        />
                        <div>
                            <p className="font-medium text-gray-800">{selectedUser?.name || "User Name"}</p>
                            <p className="text-sm text-gray-500">{selectedUser?.lastSeen || "9:00 PM"}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-500">
                        <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full">
                            <i className="fa-solid fa-video"></i>
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full">
                            <i className="fa-solid fa-phone"></i>
                        </button>
                        <div className="relative">
                            <button
                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full"
                                onClick={handleToggle}
                            >
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                    <ul className="py-2">
                                        <li
                                            className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleOptionClick("Copy")}
                                        >
                                            Copy
                                        </li>
                                        <li
                                            className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleOptionClick("Forward")}
                                        >
                                            Forward
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-grow p-4 overflow-y-auto">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.user === "You" ? "justify-end" : ""}`}>
                            <div
                                className={`max-w-xs p-3 rounded-lg shadow ${msg.user === "You"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                                    }`}
                            >
                                <p>{msg.text}</p>
                                <p className="text-xs mt-1 text-gray-500 text-right">{msg.time}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Message Input */}
                <div className="p-3 bg-white border-t flex items-center space-x-3">
                    <button className="flex items-center justify-center w-10 h-10 text-gray-500 hover:bg-gray-100 rounded-full">
                        <i className="fa-solid fa-smile"></i>
                    </button>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 p-2 focus:outline-none"
                    />
                    <button className="flex items-center justify-center w-10 h-10 text-gray-500 hover:bg-gray-100 rounded-full">
                        <i className="fa-solid fa-paperclip"></i>
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 text-gray-500 hover:bg-gray-100 rounded-full">
                        <i className="fa-solid fa-camera"></i>
                    </button>
                    <button
                        onClick={sendMessage}
                        className="bg-blue-500 text-white px-4 py-2 rounded-full shadow"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccessForms;
