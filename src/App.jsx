import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ForgotPasswordSuccess from "./pages/Auth/ForgotPasswordSuccess";
import Register from "./pages/Auth/Register";
import RegisterSuccess from "./pages/Auth/RegisterSuccess";
import Home from "./pages/Client/Layout";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsMobile, setIsLgScreen } from "./stores/slice/screen.slice";

import "./App.css";
import Chat from "./pages/Client/Chat";
import AdminLayout from "./pages/Admin/Layout";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth <= 768));
      dispatch(setIsLgScreen(window.innerWidth > 768));
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/forgot-password-success"
          element={<ForgotPasswordSuccess />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/register-success" element={<RegisterSuccess />} />

        <Route path="/admin/*" element={<AdminLayout />} />

        <Route path="/chat" element={<Chat />} />
        <Route path="/*" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
