import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Header.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "/logo.png";
import authServices from "@/services/authServices";
import Cookies from "js-cookie";
import { Link, NavLink, useNavigate } from "react-router-dom";
import userServices from "@/services/userServices";

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
} from "@material-tailwind/react";

import { Avatar } from "antd";
import { useSelector } from "react-redux";

function Header() {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(
      localStorage.getItem("user") ? localStorage.getItem("user") : null
    )
  );
  const { userInfo: userInfoRedux } = useSelector((state) => state.user);
  useEffect(() => {
    userInfoRedux && setUserInfo(userInfoRedux);
  }, [userInfoRedux]);
  const location = useLocation();
  const [openDialogLogout, setOpenDialogLogout] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/") {
      const token = localStorage.getItem("accessToken");
      if (!token) navigate("/find-jobs");
      const userInfoo =
        localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user"));
      if (userInfoo && userInfoo.role === 0) navigate("/find-jobs");
      if (userInfoo && userInfoo.role === 1) navigate("/find-freelancers");
      if (userInfoo && userInfoo.role === 3) navigate("/admin/dashboard");
    }
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
                  to={"/find-jobs"}
                  className={({ isActive }) =>
                    ` flex items-center item  ${isActive ? "item-active" : ""}`
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
                      <p className="font-bold whitespace-nowrap">Tìm Job</p>
                    </>
                  )}
                </NavLink>
                <NavLink
                  to={"/find-freelancers"}
                  className={({ isActive }) =>
                    `flex item items-center ${isActive ? "item-active" : ""}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <i
                        className={`nav-icon ${
                          isActive
                            ? "fa-solid fa-user-magnifying-glass"
                            : "fa-regular fa-user-magnifying-glass"
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
            {userInfo ? (
              <>
                <NavLink
                  to={"/find-jobs"}
                  className={({ isActive }) =>
                    ` flex items-center item  ${isActive ? "item-active" : ""}`
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
                      <p className="font-bold whitespace-nowrap">Tìm Job</p>
                    </>
                  )}
                </NavLink>
                <NavLink
                  to={"/find-freelancers"}
                  className={({ isActive }) =>
                    `flex item items-center ${isActive ? "item-active" : ""}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <i
                        className={`nav-icon ${
                          isActive
                            ? "fa-solid fa-user-magnifying-glass"
                            : "fa-regular fa-user-magnifying-glass"
                        }`}
                      ></i>
                      <p className="font-bold whitespace-nowrap">
                        Tìm Freelancer
                      </p>
                    </>
                  )}
                </NavLink>
              </>
            ) : (
              <></>
            )}

            {userInfo && (
              <NavLink
                to={"/community"}
                className={({ isActive }) =>
                  `  flex item items-center  ${isActive ? "item-active" : ""}`
                }
              >
                {({ isActive }) => (
                  <>
                    <i
                      className={`nav-icon fa-users ${
                        isActive ? "fa-solid" : "fa-light"
                      }`}
                    ></i>
                    <p className="font-bold whitespace-nowrap">Cộng đồng</p>
                  </>
                )}
              </NavLink>
            )}
            {userInfo && (
              <NavLink
                to={"/projects"}
                className={({ isActive }) =>
                  `  flex item items-center  ${isActive ? "item-active" : ""}`
                }
              >
                {({ isActive }) => (
                  <>
                    <i
                      className={`nav-icon  fa-cabinet-filing ${
                        isActive ? "fa-solid" : "fa-regular"
                      }`}
                    ></i>
                    <p className="font-bold whitespace-nowrap">Các dự án</p>
                  </>
                )}
              </NavLink>
            )}
          </div>
        </div>
        <div className="right-nav flex justify-between items-center">
          {userInfo && (
            <div className="cursor-pointer" onClick={() => navigate("/chat")}>
              <i className="nav-icon fa-solid fa-comments-alt"></i>
            </div>
          )}
          <div className="font-bold">
            {userInfo ? (
              <Menu>
                <MenuHandler>
                  <div className="flex items-center">
                    <div className="h-[40px] w-[40px]">
                      <Avatar size={40} shape="circle" src={userInfo.avatar} />
                    </div>
                    <p className="py-2 hidden md:block px-2">{userInfo.name}</p>
                  </div>
                </MenuHandler>
                <MenuList>
                  <MenuItem
                    onClick={() => navigate(`/profile/${userInfo._id}`)}
                  >
                    <i className="fa-solid fa-id-card mr-2"></i> Trang cá nhân
                  </MenuItem>
                  <MenuItem onClick={() => navigate(`/billing`)}>
                    <i className="fa-solid fa-money-bill mr-2"></i> Thanh toán
                  </MenuItem>
                  <MenuItem>
                    <i className="fa-solid fa-cogs mr-2"></i> Cài đặt
                  </MenuItem>
                  <MenuItem onClick={onClickLogout}>
                    <i className="fad fa-sign-out-alt mr-2"></i> Đăng xuất
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
          <div className="flex justify-between">
            <NavLink
              to={"/find-jobs"}
              className={({ isActive }) =>
                ` flex items-center item  ${isActive ? "item-active" : ""}`
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
                  <p className="font-bold whitespace-nowrap">Tìm Job</p>
                </>
              )}
            </NavLink>
            <NavLink
              to={"/find-freelancers"}
              className={({ isActive }) =>
                `flex item items-center ${isActive ? "item-active" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  <i
                    className={`nav-icon ${
                      isActive
                        ? "fa-solid fa-user-magnifying-glass"
                        : "fa-regular fa-user-magnifying-glass"
                    }`}
                  ></i>
                  <p className="font-bold whitespace-nowrap">Tìm Freelancer</p>
                </>
              )}
            </NavLink>
          </div>
        )}
        {userInfo ? (
          <>
            <NavLink
              to={"/find-jobs"}
              className={({ isActive }) =>
                ` flex items-center item  ${isActive ? "item-active" : ""}`
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
                  <p
                    className={`${
                      isActive ? "inline-block" : "hidden"
                    } font-bold whitespace-nowrap`}
                  >
                    Tìm Job
                  </p>
                </>
              )}
            </NavLink>
            <NavLink
              to={"/find-freelancers"}
              className={({ isActive }) =>
                `flex item items-center ${isActive ? "item-active" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  <i
                    className={`nav-icon ${
                      isActive
                        ? "fa-solid fa-user-magnifying-glass"
                        : "fa-regular fa-user-magnifying-glass"
                    }`}
                  ></i>
                  <p
                    className={`${
                      isActive ? "inline-block" : "hidden"
                    } font-bold whitespace-nowrap`}
                  >
                    Tìm Freelancer
                  </p>
                </>
              )}
            </NavLink>
          </>
        ) : (
          <></>
        )}

        {userInfo && (
          <NavLink
            to={"/community"}
            className={({ isActive }) =>
              `  flex item items-center  ${isActive ? "item-active" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                <i
                  className={`nav-icon fa-users ${
                    isActive ? "fa-solid" : "fa-light"
                  }`}
                ></i>
                <p
                  className={`${
                    isActive ? "inline-block" : "hidden"
                  } font-bold whitespace-nowrap`}
                >
                  Cộng đồng
                </p>
              </>
            )}
          </NavLink>
        )}
        {userInfo && (
          <NavLink
            to={"/projects"}
            className={({ isActive }) =>
              `  flex item items-center  ${isActive ? "item-active" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                <i
                  className={`nav-icon  fa-cabinet-filing ${
                    isActive ? "fa-solid" : "fa-regular"
                  }`}
                ></i>
                <p
                  className={`${
                    isActive ? "inline-block" : "hidden"
                  } font-bold whitespace-nowrap`}
                >
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
          <Button variant="gradient" color="red" onClick={handleLogout}>
            <span>Đăng xuất</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

export default Header;
