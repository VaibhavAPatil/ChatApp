import React from "react";
import NavbarChat from "../components/chat/Navbar.chat";
import SidebarChat from "../components/chat/Sidebar.chat";
import ChatBoxChat from "../components/chat/ChatBox.chat";

function Chat() {
  return (
    <>
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
        <NavbarChat />
        <SidebarChat />
        <ChatBoxChat />
      </div>
    </>
  );
}

export default Chat;
