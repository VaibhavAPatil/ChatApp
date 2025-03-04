import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chats";

function ChatPage() {
  return (
    <>
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Sidebar />
        <Chat />
      </div>
    </>
  );
}

export default ChatPage;
