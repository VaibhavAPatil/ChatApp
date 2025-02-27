import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chats";

function ChatPage() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Chat />
    </>
  );
}

export default ChatPage;
