import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Header.css";
import { useEffect, useState } from "react";
import logo from "/logo.png";
import authServices from "../../../services/authServices";
import Cookies from "js-cookie";
import { Link, NavLink, useNavigate } from "react-router-dom";
import userServices from "../../../services/userServices";

import {
    Badge,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Avatar,
} from "@material-tailwind/react";

function Header() {
    const [userInfo, setUserInfo] = useState(
        JSON.parse(Cookies.get("user") ? Cookies.get("user") : null)
    );
    const [openDialogLogout, setOpenDialogLogout] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (token && !userInfo) {
            userServices.getMe();
        }
        if (!userInfo && Cookies.get("user")) {
            setUserInfo(JSON.parse(Cookies.get("user")));
        }
        if (!userInfo) navigate("/home/find-jobs");
        if (userInfo && userInfo.role === "0") navigate("/home/find-jobs");
        if (userInfo && userInfo.role === "1")
            navigate("/home/find-freelancers");
    }, []);

    const onClickLogout = () => {
        setOpenDialogLogout(true);
    };

    const handleLogout = async () => {
        setOpenDialogLogout(false);
        await authServices.logout();
        setUserInfo("");
        navigate("/login");
    };

    return (
        <div>
            <div className="nav flex justify-between items-center">
                <div className="left-nav sz:block flex justify-between items-center">
                    <a href={"http://localhost:2222/"}>
                        <img className="logo" src={logo} alt="Logo" />
                    </a>

                    <div className=" justify-between items-center hidden lg:flex">
                        {!userInfo && (
                            <div className="abc hidden lg:flex">
                                <NavLink
                                    to={"/home/find-jobs"}
                                    className={({ isActive }) =>
                                        ` flex items-center item  ${
                                            isActive ? "item-active" : ""
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <i
                                                className={`nav-icon ${
                                                    isActive
                                                        ? "fa-duotone fa-magnifying-glass-waveform"
                                                        : "fa-regular fa-magnifying-glass"
                                                }`}
                                            ></i>
                                            <p className="font-bold whitespace-nowrap">
                                                Tìm Job
                                            </p>
                                        </>
                                    )}
                                </NavLink>
                                <NavLink
                                    to={"/home/find-freelancers"}
                                    className={({ isActive }) =>
                                        `flex item items-center ${
                                            isActive ? "item-active" : ""
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <i
                                                className={`nav-icon ${
                                                    isActive
                                                        ? "fa-duotone fa-magnifying-glass-waveform"
                                                        : "fa-regular fa-magnifying-glass"
                                                }`}
                                            ></i>
                                            <p className="font-bold whitespace-nowrap">
                                                Tìm Freelancer
                                            </p>
                                        </>
                                    )}
                                </NavLink>
                            </div>
                        )}
                        {userInfo && userInfo.role === "0" ? (
                            <NavLink
                                to={"/home/find-jobs"}
                                className={({ isActive }) =>
                                    ` flex items-center item  ${
                                        isActive ? "item-active" : ""
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <i
                                            className={`nav-icon ${
                                                isActive
                                                    ? "fa-duotone fa-magnifying-glass-waveform"
                                                    : "fa-regular fa-magnifying-glass"
                                            }`}
                                        ></i>
                                        <p className="font-bold whitespace-nowrap">
                                            Tìm Job
                                        </p>
                                    </>
                                )}
                            </NavLink>
                        ) : (
                            <div></div>
                        )}

                        {userInfo && userInfo.role === "1" ? (
                            <NavLink
                                to={"/home/find-freelancers"}
                                className={({ isActive }) =>
                                    `flex item items-center ${
                                        isActive ? "item-active" : ""
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <i
                                            className={`nav-icon ${
                                                isActive
                                                    ? "fa-duotone fa-magnifying-glass-waveform"
                                                    : "fa-regular fa-magnifying-glass"
                                            }`}
                                        ></i>
                                        <p className="font-bold whitespace-nowrap">
                                            Tìm Freelancer
                                        </p>
                                    </>
                                )}
                            </NavLink>
                        ) : (
                            <div></div>
                        )}

                        {userInfo && (
                            <NavLink
                                to={"/home/community"}
                                className={({ isActive }) =>
                                    `  flex item items-center  ${
                                        isActive ? "item-active" : ""
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <i
                                            className={`nav-icon fa-users ${
                                                isActive
                                                    ? "fa-solid"
                                                    : "fa-light"
                                            }`}
                                        ></i>
                                        <p className="font-bold whitespace-nowrap">
                                            Cộng đồng
                                        </p>
                                    </>
                                )}
                            </NavLink>
                        )}
                        {userInfo && (
                            <NavLink
                                to={"/home/projects"}
                                className={({ isActive }) =>
                                    `  flex item items-center  ${
                                        isActive ? "item-active" : ""
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <i
                                            className={`nav-icon  fa-cabinet-filing ${
                                                isActive
                                                    ? "fa-solid"
                                                    : "fa-regular"
                                            }`}
                                        ></i>
                                        <p className="font-bold whitespace-nowrap">
                                            Các dự án
                                        </p>
                                    </>
                                )}
                            </NavLink>
                        )}
                    </div>
                </div>
                <div className="right-nav flex justify-between items-center">
                    <div className="mr-2">
                        <Badge content="5">
                            <i className="nav-icon fa-solid fa-bell"></i>
                        </Badge>
                    </div>
                    {userInfo && (
                        <div>
                            <i className="nav-icon fa-solid fa-comments-alt"></i>
                        </div>
                    )}
                    <div className="font-bold">
                        {userInfo ? (
                            <Menu>
                                <MenuHandler>
                                    <div className="flex items-center">
                                        <Avatar
                                            withBorder={true}
                                            className="p-0.5 "
                                            src={userInfo.avatar}
                                        />
                                        <p className="py-2 hidden md:block px-2">
                                            {userInfo.name}
                                        </p>
                                    </div>
                                </MenuHandler>
                                <MenuList>
                                    <MenuItem>
                                        <i className="fa-solid fa-id-card mr-2"></i>{" "}
                                        Trang cá nhân
                                    </MenuItem>
                                    <MenuItem>
                                        <i className="fa-solid fa-cogs mr-2"></i>{" "}
                                        Cài đặt
                                    </MenuItem>
                                    <MenuItem onClick={onClickLogout}>
                                        <i className="fad fa-sign-out-alt mr-2"></i>{" "}
                                        Đăng xuất
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        ) : (
                            <div className="flex items-center">
                                <i className="nav-icon fa-solid fa-user-circle"></i>
                                <Link to="/login" className="whitespace-nowrap">
                                    Đăng nhập
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="h-[50px]"></div>
            <div className="abcd lg:hidden flex  justify-around bg-white items-center ">
                {!userInfo && (
                    <div className="flex">
                        <NavLink
                            to={"/home/find-jobs"}
                            className={({ isActive }) =>
                                ` flex items-center item  ${
                                    isActive ? "item-active" : ""
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <i
                                        className={`nav-icon ${
                                            isActive
                                                ? "fa-duotone fa-magnifying-glass-waveform"
                                                : "fa-regular fa-magnifying-glass"
                                        }`}
                                    ></i>
                                    <p className="font-bold whitespace-nowrap">
                                        Tìm Job
                                    </p>
                                </>
                            )}
                        </NavLink>
                        <NavLink
                            to={"/home/find-freelancers"}
                            className={({ isActive }) =>
                                `flex item items-center ${
                                    isActive ? "item-active" : ""
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <i
                                        className={`nav-icon ${
                                            isActive
                                                ? "fa-duotone fa-magnifying-glass-waveform"
                                                : "fa-regular fa-magnifying-glass"
                                        }`}
                                    ></i>
                                    <p className="font-bold whitespace-nowrap">
                                        Tìm Freelancer
                                    </p>
                                </>
                            )}
                        </NavLink>
                    </div>
                )}
                {userInfo && userInfo.role === "0" ? (
                    <NavLink
                        to={"/home/find-jobs"}
                        className={({ isActive }) =>
                            ` flex items-center item  ${
                                isActive ? "item-active" : ""
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <i
                                    className={`nav-icon ${
                                        isActive
                                            ? "fa-duotone fa-magnifying-glass-waveform"
                                            : "fa-regular fa-magnifying-glass"
                                    }`}
                                ></i>
                                <p className="font-bold whitespace-nowrap">
                                    Tìm Job
                                </p>
                            </>
                        )}
                    </NavLink>
                ) : (
                    <></>
                )}

                {userInfo && userInfo.role === "1" ? (
                    <NavLink
                        to={"/home/find-freelancers"}
                        className={({ isActive }) =>
                            `flex item items-center ${
                                isActive ? "item-active" : ""
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <i
                                    className={`nav-icon ${
                                        isActive
                                            ? "fa-duotone fa-magnifying-glass-waveform"
                                            : "fa-regular fa-magnifying-glass"
                                    }`}
                                ></i>
                                <p className="font-bold whitespace-nowrap">
                                    Tìm Freelancer
                                </p>
                            </>
                        )}
                    </NavLink>
                ) : (
                    <></>
                )}

                {userInfo && (
                    <NavLink
                        to={"/home/community"}
                        className={({ isActive }) =>
                            `  flex item items-center  ${
                                isActive ? "item-active" : ""
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <i
                                    className={`nav-icon fa-users ${
                                        isActive ? "fa-solid" : "fa-light"
                                    }`}
                                ></i>
                                <p className="font-bold whitespace-nowrap">
                                    Cộng đồng
                                </p>
                            </>
                        )}
                    </NavLink>
                )}
                {userInfo && (
                    <NavLink
                        to={"/home/projects"}
                        className={({ isActive }) =>
                            `  flex item items-center  ${
                                isActive ? "item-active" : ""
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <i
                                    className={`nav-icon  fa-cabinet-filing ${
                                        isActive ? "fa-solid" : "fa-regular"
                                    }`}
                                ></i>
                                <p className="font-bold whitespace-nowrap">
                                    Các dự án
                                </p>
                            </>
                        )}
                    </NavLink>
                )}
            </div>

            <Dialog
                open={openDialogLogout}
                handler={() => {
                    setOpenDialogLogout(!openDialogLogout);
                }}
            >
                <DialogHeader>Đăng xuất</DialogHeader>
                <DialogBody>Bạn có chắc chắn muốn đăng xuất?</DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => {
                            setOpenDialogLogout(!openDialogLogout);
                        }}
                        className="mr-1"
                    >
                        <span>Huỷ bỏ</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={handleLogout}
                    >
                        <span>Đăng xuất</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            <ToastContainer />
        </div>
    );
}

export default Header;
