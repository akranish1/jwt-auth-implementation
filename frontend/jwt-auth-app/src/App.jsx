import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Singup";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  const handleLoginSuccess = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute token={token}>
            <Profile token={token} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to={token ? "/profile" : "/login"} />} />
    </Routes>
  );
}
