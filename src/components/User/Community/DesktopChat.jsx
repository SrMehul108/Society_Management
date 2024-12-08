import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { GetSocketMessages, SendMessage } from "../../../apis/api";
import { Icons } from "../../../constants";
import CallComponent from "./CallComponent";

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
  const [calling, setCalling] = useState(false); // For handling call states
  const [roomId, setRoomId] = useState();
  const [isVoiceCall, setIsVoiceCall] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!currentUserData?._id || !selectedUser?._id) {
      console.error(
        "Cannot join chat: Missing currentUserId or chatPartnerId."
      );
      return;
    }

    var roomId = `${currentUserData._id}-${selectedUser._id}`;
    setRoomId(roomId);
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

    return () => {
      socket.off("receive-message");
      socket.off("user-typing");
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

  const initiateVoiceCall = () => {
    setCalling(true);
    setIsVoiceCall(true);
  };

  const initiateVideoCall = () => {
    setCalling(true);
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-[98%] flex">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-white p-4 border-r overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        <div className="space-y-3">
          {users && users.length ? (
            users.map((user) => (
              <div
                key={user._id}
                onClick={() => handleUserSelection(user)}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer ${
                  selectedUser?._id === user._id
                    ? "bg-gray-200"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="h-10 w-10 bg-gray-300 rounded-full overflow-hidden">
                  <img src={user.profile_image} alt="" />
                </div>
                <div>
                  <p className="font-medium">
                    {user.fullName || "Unknown User"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user.lastMessage || ""}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No users found</p>
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-white flex flex-col">
        {/* Header */}
        <div className="p-4 bg-white shadow-sm border-b flex items-center justify-between">
          <h3 className="text-lg font-bold flex items-center gap-5">
            <div className="h-10 w-10 bg-gray-300 rounded-full overflow-hidden">
              {selectedUser?.profile_image ? (
                <img
                  src={selectedUser.profile_image}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center text-sm text-gray-500 ">
                  No Image
                </div>
              )}
            </div>
            {selectedUser?.fullName || "Select a user to start chatting"}
          </h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={initiateVideoCall}
              className="p-2 text-white rounded-full"
              style={{ backgroundColor: "#f6f8fb" }}
            >
              {Icons.videocall}
            </button>
            <button
              onClick={initiateVoiceCall}
              className="p-2 text-white rounded-full"
              style={{ backgroundColor: "#f6f8fb" }}
            >
              {Icons.phonecall}
            </button>
          </div>
        </div>
        {isVoiceCall && (
          <CallComponent
            currentUserId={currentUserData._id}
            calleeId={selectedUser._id}
            roomId={roomId}
            callType="audio"
          />
        )}

        {/* Messages */}
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

        {/* Message Input */}
        {selectedUser && (
          <div className="p-4 bg-gray-100 border-t flex items-center space-x-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Send
            </button>
            <button
              onClick={initiateVoiceCall}
              className="p-2 text-white rounded-full"
              style={{ backgroundColor: "#5678e9" }}
            >
              {Icons.Recording}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopChat;
