import React, { useState, useEffect } from "react";
import MobileChat from "../../../../components/User/Community/MobileChat";
import DesktopChat from "../../../../components/User/Community/DesktopChat";

const AccessForms = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Michael John", lastMessage: "Hi, John! How are you?", active: false },
    { id: 2, name: "Elizabeth Sarah", lastMessage: "Thank you for your order!", active: false },
    { id: 3, name: "Jenny Wilson", lastMessage: "Hello, Jenny", active: false },
    { id: 4, name: "Arlene McCoy", lastMessage: "Hi there, how are you?", active: false },
    { id: 5, name: "Esther Howard", lastMessage: "Hello, Esther", active: false },
    { id: 6, name: "Cody Fisher", lastMessage: "Thank you for your order!", active: false },
    { id: 7, name: "Cody Fisher", lastMessage: "Thank you for your order!", active: false },
    { id: 8, name: "Cody Fisher", lastMessage: "Thank you for your order!", active: false },
    { id: 9, name: "Cody Fisher", lastMessage: "Thank you for your order!", active: false },
    { id: 10, name: "Cody Fisher", lastMessage: "Thank you for your order!", active: false },
  ]);

  const [messages, setMessages] = useState([
    { user: "Arlene McCoy", text: "Hi there, how are you?", time: "9:20" },
    { user: "Arlene McCoy", text: "I have to travel a long distance soon.", time: "9:22" },
    { user: "You", text: "I’ll be there shortly. Please wait!", time: "9:30" },
  ]);

  const [selectedUser, setSelectedUser] = useState(users.find((user) => user.active));
  const [newMessage, setNewMessage] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Track sidebar visibility

  // Detect screen resizing and update state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setMessages([
      { user: user.name, text: "Sample message for this chat.", time: "9:00" },
    ]);
  };

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages([...messages, { user: "You", text: newMessage, time }]);
      setNewMessage("");
    }
  };

  const backToUserList = () => {
    setSelectedUser(null); // Reset selected user when going back
  };

  const toggleSidebarVisibility = () => {
    setIsSidebarVisible((prevState) => !prevState); // Toggle sidebar visibility
  };

  return (
    <>
      {isMobile ? (
        <MobileChat
          users={users}
          selectedUser={selectedUser}
          handleUserSelection={handleUserSelection}
          messages={messages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessage={sendMessage}
          backToUserList={backToUserList}
          isSidebarVisible={isSidebarVisible}
          toggleSidebarVisibility={toggleSidebarVisibility}
        />
      ) : (
        <DesktopChat
          users={users}
          selectedUser={selectedUser}
          handleUserSelection={handleUserSelection}
          messages={messages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessage={sendMessage}
        />
      )}
    </>
  );
};

export default AccessForms;
