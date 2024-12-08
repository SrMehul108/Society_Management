import React, { useState, useEffect } from "react";
import MobileChat from "../../../../components/User/Community/MobileChat";
import DesktopChat from "../../../../components/User/Community/DesktopChat";
import { io } from "socket.io-client";
import { GetSocketMessages, GetSocketUser, UserToken } from "../../../../apis/api";
import { jwtDecode } from "jwt-decode";

const AccessForms = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // Initialize currentUser state

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Initialize the socket connection
    const newSocket = io("https://society-management-4z4w.onrender.com");
    setSocket(newSocket);

    return () => {
      // Clean up socket connection when component unmounts
      newSocket.close();
    };
  }, []);

  // Fetch users function
  const fetchUsers = async () => {
    try {
      const response = await GetSocketUser();
      if (response.success) {
        console.log("Fetched users:", response.data);
        setUsers(response.data);
      } else {
        console.error("Error fetching users:", response.message);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  // Fetch and set the current user's data
  const CurrentUserDataFunct = () => {
    const token = UserToken();
    const decodedToken = jwtDecode(token);
    const currentUser = decodedToken.userData;  // Extract current user data from the token
    console.log("Current user:", currentUser);
    setCurrentUser(currentUser);  // Set current user in state
  };

  useEffect(() => {
    fetchUsers();
    CurrentUserDataFunct();
  }, []);

  // Handle user selection for chat
  const handleUserSelection = async (user) => {
    if (!currentUser) {
      console.error("Current user (_id) is missing.");
      return;
    }

    try {
      setSelectedUser(user); // Set selected user
      const response = await GetSocketMessages(currentUser._id, user._id);
      setMessages(response.data); // Set messages to state
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Send message to the selected user
  const sendMessage = () => {
    if (newMessage.trim() === "") {
      return;
    }

    if (!currentUser || !selectedUser) {
      console.error("Missing currentUser or selectedUser");
      return;
    }

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const message = {
      user: currentUser._id,  // Use current user's _id
      text: newMessage,
      time,
      to: selectedUser._id,  // Send to selected user's _id
    };

    socket.emit("send-message", message); // Emit message to server
    setMessages((prevMessages) => [...prevMessages, message]); // Update local state
    setNewMessage(""); // Clear message input
  };

  const backToUserList = () => {
    setSelectedUser(null);
  };

  const toggleSidebarVisibility = () => {
    setIsSidebarVisible((prevState) => !prevState);
  };

  return (
    <>
      {isMobile ? (
        <MobileChat
        users={users}
        currentUserData={currentUser}
        selectedUser={selectedUser}
        handleUserSelection={handleUserSelection}
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
        socket={socket}  // Pass socket instance here
        />
      ) : (
        <DesktopChat
          users={users}
          currentUserData={currentUser}
          selectedUser={selectedUser}
          handleUserSelection={handleUserSelection}
          messages={messages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessage={sendMessage}
          socket={socket}  // Pass socket instance here
        />
      )}
    </>
  );
};

export default AccessForms;
