import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatPage from "./pages/ChatPage";
import Home from "./pages/Home.jsx";
import ChatUi from "./pages/ChatUi.jsx";

function App() {
  const login = false;
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatui" element={<ChatUi />} />
      </Routes>
    </>
  );
}

export default App;
