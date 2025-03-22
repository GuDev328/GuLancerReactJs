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
import WrapperRouter from "./components/utils/WrapperRouter";
import AdminRootPage from "./pages/Admin";
import AuthWrapperRouter from "./components/utils/AuthWrapperRouter";
import DisputePage from "./pages/Both/Dispute";

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
        <Route
          path="/login"
          element={<AuthWrapperRouter Component={Login} />}
        />
        <Route
          path="/forgot-password"
          element={<AuthWrapperRouter Component={ForgotPassword} />}
        />
        <Route
          path="/forgot-password-success"
          element={<ForgotPasswordSuccess />}
        />
        <Route
          path="/dispute/:dispute_id"
          element={<WrapperRouter Component={DisputePage} />}
        />
        <Route
          path="/register"
          element={<AuthWrapperRouter Component={Register} />}
        />
        <Route
          path="/register-success"
          element={<AuthWrapperRouter Component={RegisterSuccess} />}
        />
        <Route path="/chat" element={<WrapperRouter Component={Chat} />} />
        <Route
          path="/admin/*"
          element={<WrapperRouter admin={true} Component={AdminRootPage} />}
        />
        <Route path="/*" element={<WrapperRouter Component={Home} />} />
      </Routes>
    </Router>
  );
}

export default App;
