import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import logo from "/logo.png";
import authServices from "../../services/authServices";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";

function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigateTo = useNavigate();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSignIn();
        }
    };
    const handleSignIn = async () => {
        if (email.length === 0 || password.length === 0) {
            toast.error("Không được để trống tài khoản hoặc mật khẩu");
            return;
        }
        const res = await authServices.login(email, password);
        if (res.status === 200) {
            navigateTo("/");
        } else {
            toast.error(res);
        }
    };

    return (
        <div
            className="flex w-full h-full justify-center items-center"
            style={{ backgroundColor: "#e6e6e6" }}
        >
            <div className="container mx-auto p-3 my-5">
                <div className="flex flex-row">
                    <div className="hidden lg:block lg:w-6/12">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="w-full"
                            alt="Phone image"
                        />
                    </div>

                    <div
                        className="w-full p-5 rounded-3xl lg:w-4/12 flex justify-center items-center flex-col mb-5"
                        style={{ backgroundColor: "#ffffff" }}
                    >
                        <img
                            className="mx-auto w-3/4 lg:w-full mb-10"
                            style={{ width: "250px" }}
                            src={logo}
                            alt=""
                        />
                        <div className="mb-3 w-full">
                            <Input
                                label="Email"
                                value={email}
                                onKeyDown={handleKeyPress}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                            />
                        </div>

                        <div className="mb-2 w-full form-group">
                            <div className="passwordInput">
                                <Input
                                    label="Mật khẩu"
                                    type={showPassword ? "text" : "password"}
                                    onKeyDown={handleKeyPress}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <div
                                    className="hideShowPasswordBtn"
                                    onClick={handleTogglePassword}
                                >
                                    {showPassword ? (
                                        <i className="fa-solid fa-eye-slash"></i>
                                    ) : (
                                        <i className="fa-solid fa-eye"></i>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mx-4 text-sm me-auto mb-4">
                            <Link
                                to="/forgot-password"
                                className="text-blue-500"
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>

                        <Button
                            onClick={handleSignIn}
                            className="btn mb-1  font-bold"
                            style={{
                                backgroundColor: "#2881E2",
                                width: "70%",
                                color: "white",
                            }}
                            type="button"
                            size="sm"
                        >
                            Đăng nhập
                        </Button>
                        <Button
                            className="focus:outline-none mb-2"
                            style={{ width: "70%", backgroundColor: "#fd2f19" }}
                            type="button"
                            size="sm"
                        >
                            <i className="fa-brands fa-google mx-2"></i>
                            Đăng nhập với Google
                        </Button>

                        <div className="text-sm">
                            Chưa có tài khoản?{" "}
                            <Link to="/register">Đăng ký</Link>{" "}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer stacked />
        </div>
    );
}

export default Login;
