import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "/logo.png";
import authServices from "../../services/authServices";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Select, Option } from "@material-tailwind/react";
import userServices from "../../services/userServices";

function Register() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [date_of_birth, setDate_of_birth] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [location, setLocation] = useState("");
    const [chooseRole, setChooseRole] = useState("");
    const [gender, setGender] = useState("");
    const navigateTo = useNavigate();

    const handleRegister = async () => {
        if (
            !email ||
            !name ||
            !username ||
            !date_of_birth ||
            !phone_number ||
            !location ||
            !gender
        ) {
            toast.error("Không được để trống các trường");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneNumberRegex = /^0\d{9}$/;

        if (!emailRegex.test(email)) {
            toast.error("Email không đúng định dạng");
            return;
        }
        if (!phoneNumberRegex.test(phone_number)) {
            toast.error("Số điện thoại không đúng định dạng");
            return;
        }

        if (chooseRole === "") {
            toast.error("Bạn chưa chọn vai trò");
            return;
        }
        const data = {
            email,
            name,
            username,
            date_of_birth: new Date(date_of_birth).toISOString(),
            phone_number,
            location,
            gender,
            role: chooseRole === "freelancer" ? 0 : 1,
        };

        const res = await authServices.register(data);
        if (res.status === 200) {
            toast.success("Đăng ký thành công");
            setTimeout(() => navigateTo("/register-success"), 2000);
        } else {
            toast.error(res);
        }
    };
    console.log(gender);
    return (
        <div className="flex w-full h-full justify-center items-center">
            <div className="container mx-auto p-3 my-5">
                <div className="flex flex-col lg:flex-row">
                    <div className="hidden lg:block lg:w-1/2">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="img-fluid"
                            alt="Phone image"
                        />
                    </div>

                    <div
                        className="w-full lg:w-1/2 rounded-3xl p-8"
                        style={{ backgroundColor: "#ffffff" }}
                    >
                        <img
                            className="img-fluid mx-auto w-3/4 lg:w-2/3 lg:w-1/2 xl:w-1/3 mb-4"
                            style={{ width: "250px" }}
                            src={logo}
                            alt=""
                        />
                        <h3 className="font-bold text-2xl mb-3">Đăng ký</h3>
                        <div className="w-full mb-2">
                            <Input
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                            />
                        </div>
                        <div className="flex  mb-2">
                            <div className="w-full lg:w-1/2 pr-2 mb-2">
                                <Input
                                    label="Họ và tên"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    className="mb-2"
                                    id="name"
                                />
                            </div>
                            <div className="w-full lg:w-1/2 pl-2 mb-2">
                                <Input
                                    size="sm"
                                    label="Số điện thoại"
                                    value={phone_number}
                                    onChange={(e) =>
                                        setPhone_number(e.target.value)
                                    }
                                    type="text"
                                    id="phone_number"
                                />
                            </div>
                        </div>
                        <div className="flex mb-2">
                            <div className="w-full lg:w-1/2 pr-2 mb-2">
                                <Input
                                    label="Tên người dùng"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    type="text"
                                    id="username"
                                />
                            </div>
                            <div className="w-full lg:w-1/2 pl-2 mb-2">
                                <Input
                                    label="Ngày sinh"
                                    value={date_of_birth}
                                    onChange={(e) =>
                                        setDate_of_birth(e.target.value)
                                    }
                                    type="date"
                                    id="date_of_birth"
                                />
                            </div>
                        </div>
                        <div className=" flex mb-3">
                            <Input
                                className="w-3/5"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                type="text"
                                label="Địa chỉ"
                                id="location"
                            />
                            <div className="w-2/5 pl-4">
                                <Select
                                    label="Giới tính"
                                    id="gender"
                                    value={gender}
                                    onChange={(val) => setGender(val)}
                                >
                                    <Option value="0">Nam</Option>
                                    <Option value="1">Nữ</Option>
                                </Select>
                            </div>
                        </div>
                        <div className="flex justify-around items-center mb-4">
                            <Button
                                className="p-4 focus:outline-none border-0"
                                style={{
                                    backgroundColor:
                                        chooseRole === "freelancer"
                                            ? "#2881E2"
                                            : "#333",
                                }}
                                onClick={() => setChooseRole("freelancer")}
                            >
                                Tôi là Freelancer
                            </Button>
                            <Button
                                className="p-4 focus:outline-none border-0"
                                style={{
                                    backgroundColor:
                                        chooseRole === "employer"
                                            ? "#2881E2"
                                            : "#333",
                                }}
                                onClick={() => setChooseRole("employer")}
                            >
                                Tôi là Employer{" "}
                            </Button>
                        </div>
                        <div className="w-full flex justify-center items-center flex-col">
                            <Button
                                className="w-full focus:outline-none"
                                style={{ backgroundColor: "#2881E2" }}
                                onClick={handleRegister}
                                size="sm"
                            >
                                Đăng ký
                            </Button>
                            <div className="flex text-sm justify-center items-center mt-1 w-80">
                                Đã có tài khoản?{" "}
                                <Link to="/login">Đăng nhập</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Register;
