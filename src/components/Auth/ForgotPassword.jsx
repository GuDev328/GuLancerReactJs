import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import logo from "/logo.png";
import authServices from "../../services/authServices";
import Cookies from "js-cookie";
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '@material-tailwind/react';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigateTo = useNavigate();

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleForgotPassword()
        }
    };

    const handleForgotPassword = async () => {
        if (email.length === 0) {
            toast.error("Không được để trống email");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Email không đúng định dạng");
            return;
        }
        const res = await authServices.forgotPassword(email);
        if (res.status === 200) {
            navigateTo("/forgot-password-success");
        } else {
            toast.error(res);
        }
    }

    return (
        <div className="flex w-full h-full justify-content-center items-center ">
            <div className="container mx-auto p-3 my-5">
                <div className="flex flex-row">
                    <div className="hidden md:block md:w-6/12">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="w-full"
                            alt="Phone image"
                        />
                    </div>

                    <div className="w-full md:w-6/12 flex justify-center items-center flex-col">
                        <img
                            className="mx-auto w-3/4 md:w-full"
                            style={{ width: "300px" }}
                            src={logo}
                            alt=""
                        />
                        <div className="mb-1 w-full">
                            <Input
                                size='lg'
                                value={email}
                                onKeyDown={handleKeyPress}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                label='Email'
                            />
                        </div>

                        <Button
                            className="btn mb-4 mt-3 font-bold focus:outline-none"
                            onKeyDown={handleKeyPress}
                            onClick={handleForgotPassword}
                            style={{
                                backgroundColor: "#6c7ee1",
                                width: "80%",
                            }}
                            type="button"
                        >
                            Quên mật khẩu
                        </Button>

                        <div>Chưa có tài khoản? <Link to='/register'>Đăng ký</Link> </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ForgotPassword;
