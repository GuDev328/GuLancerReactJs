
import Login from "./components/Auth/Login";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ForgotPasswordSuccess from "./components/Auth/ForgotPasswordSuccess";
import Register from "./components/Auth/Register";
import RegisterSuccess from "./components/Auth/RegisterSuccess";
import Home from "./components/Home/Home";



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
function App() {

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        
        <Route path="/login" element={<Login/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/forgot-password-success" element={<ForgotPasswordSuccess/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/register-success" element={<RegisterSuccess/>} />
      </Routes>
    </Router>

  )
}

export default App
