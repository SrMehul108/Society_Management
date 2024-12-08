import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { GetSocketMessages, SendMessage } from "../../../apis/api";

const socket = io("https://society-management-4z4w.onrender.com");

const DesktopChat = ({
  users,
  selectedUser,
  handleUserSelection,
  currentUserData,
}) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [partnerTyping, setPartnerTyping] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!currentUserData?._id || !selectedUser?._id) {
      console.error("Cannot join chat: Missing currentUserId or chatPartnerId.");
      return;
    }

    const roomId = `${currentUserData._id}-${selectedUser._id}`;
    socket.emit("register-user", currentUserData._id);
    socket.emit("join-chat", roomId);

    const fetchMessages = async () => {
      setLoadingMessages(true);
      try {
        const response = await GetSocketMessages(
          currentUserData._id,
          selectedUser._id
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();

    socket.on("receive-message", (newMessage) => {
      if (
        newMessage.from === selectedUser._id ||
        newMessage.to === selectedUser._id
      ) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    socket.on("user-typing", (userId) => {
      if (userId === selectedUser._id) {
        setPartnerTyping(true);
        setTimeout(() => setPartnerTyping(false), 3000);
      }
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    return () => {
      socket.off("receive-message");
      socket.off("user-typing");
      socket.off("connect_error");
    };
  }, [currentUserData?._id, selectedUser?._id]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = {
      from: currentUserData._id,
      to: selectedUser._id,
      message,
      type: "text",
    };

    try {
      const response = await SendMessage(newMessage);
      const savedMessage = response.data;

      socket.emit("send-message", savedMessage);
      setMessages((prev) => [...prev, savedMessage]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleTyping = () => {
    socket.emit("typing", currentUserData._id);
  };

  const handleStopTyping = () => {
    socket.emit("stop-typing", currentUserData._id);
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-[98%] flex">
      <div className="w-1/4 bg-white p-4 border-r overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        <div className="space-y-3">
          {users && users.length ? (
            users.map((user) => (
              <div
                key={user._id}
                onClick={() => handleUserSelection(user)}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                  selectedUser?._id === user._id ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              >
                <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="font-medium">{user.fullName || "Unknown User"}</p>
                  <p className="text-sm text-gray-500">{user.lastMessage || ""}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No users found</p>
          )}
        </div>
      </div>

      <div className="flex-1 bg-white flex flex-col">
        <div className="p-4 bg-gray-100 shadow-sm border-b">
          <h3 className="text-lg font-bold">
            {selectedUser?.fullName || "Select a user to start chatting"}
          </h3>
        </div>

        <div className="flex-grow p-4 overflow-y-auto">
          {loadingMessages ? (
            <p className="text-center text-gray-500">Loading messages...</p>
          ) : messages.length ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.from === currentUserData._id ? "justify-end" : ""
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg shadow ${
                    msg.from === currentUserData._id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p>{msg.message}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No messages yet</p>
          )}
          <div ref={messageEndRef}></div>
        </div>

        {selectedUser && (
          <div className="p-4 bg-gray-100 border-t flex items-center space-x-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyUp={handleTyping}
              onBlur={handleStopTyping}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopChat;
