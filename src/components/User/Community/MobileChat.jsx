import React, { useState, useEffect, useRef } from "react";

const MobileChat = ({
  users,
  selectedUser,
  handleUserSelection,
  backToUserList,
  isSidebarVisible,
  toggleSidebarVisibility,
  socket,  // Access socket instance here
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typingUser, setTypingUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (socket) {
      socket.on("receive-message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      socket.on("user-typing", (typingUser) => {
        setTypingUser(typingUser);
      });

      socket.on("stop-typing", () => {
        setTypingUser(null);
      });

      socket.on("online-users", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.off("receive-message");
        socket.off("user-typing");
        socket.off("stop-typing");
        socket.off("online-users");
      };
    }
  }, [socket]);

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const messageData = {
        user: "You",
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        to: selectedUser?.id,
      };
      socket.emit("send-message", messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage("");
    }
  };

  useEffect(() => {
    if (newMessage.trim() !== "") {
      socket.emit("user-typing", { userId: 123, userName: "You" });
    } else {
      socket.emit("stop-typing");
    }
  }, [newMessage, socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen sm:flex-row">
      {/* Sidebar and Chat Header components */}
      {/* Code omitted for brevity */}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default MobileChat;
