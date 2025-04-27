import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider"; // Import AuthProvider
import App from "./App";
import Login from "./pages/login";
import Signup from "./pages/signup";
import "./index.css";
import Home from "./pages/home";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  </AuthProvider>
);
