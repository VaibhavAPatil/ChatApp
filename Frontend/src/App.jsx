import { Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register";
import ChatPage from "./pages/ChatPage";
import PrivateRoute from "./config/privateRoute.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
