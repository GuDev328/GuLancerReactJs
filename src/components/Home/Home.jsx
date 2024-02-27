import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css'
import { useEffect, useState } from "react";
import logo from "/logo.png";
import authServices from "../../services/authServices";
import Cookies from "js-cookie";
import { Link, useNavigate } from 'react-router-dom';
import userServices from '../../services/userServices';
import { Badge, Button,  Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter, } from "@material-tailwind/react";

function Home() {
    const [chooseItem, setChooseItem] = useState('');
    const [userInfo, setUserInfo] = useState();
    const [openDialogLogout, setOpenDialogLogout] = useState(false);
    const accessToken = Cookies.get("accessToken");
    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (token ) {
            userServices.getMe()
        }
        if(Cookies.get("user")){
            setUserInfo(JSON.parse(Cookies.get("user")))
        }
        
    },[])

    const onClickLogout = () => {
        setOpenDialogLogout(true)
    }

    const handleLogout = async() => {
        setOpenDialogLogout(false)
        await authServices.logout()
        setUserInfo()
    }
    console.log(userInfo)
    return (
        <>
            <div className="nav flex justify-between items-center">
                <div className="left-nav sz:block flex justify-between items-center">
                    <img className="logo" src={logo} alt="Logo" />
                    <div
                        className={`flex items-center item ${userInfo?.role=== '1'? "hidden": 'block'} ${chooseItem === "FindJob" ? "item-active" : ""}`}
                        onClick={() => setChooseItem("FindJob")}
                    >
                        <i className="nav-icon fas fa-search"></i>
                        <p className='font-bold'>Tìm Job</p>
                    </div>
                    <div
                        className={`flex item items-center ${userInfo?.role=== '0'? "hidden": 'block'} ${chooseItem === "FindFreelancer" ? "item-active" : ""}`}
                        onClick={() => setChooseItem("FindFreelancer")}
                    >
                        <i className="nav-icon fas fa-search"></i>
                        <p className='font-bold'>Tìm Freelancer</p>
                    </div>
                    <div
                        className={`flex item items-center  ${chooseItem === "Community" ? "item-active" : ""}`}
                        onClick={() => setChooseItem("Community")}
                    >
                        <i className="nav-icon fas fa-users"></i>
                        <p className='font-bold'>Cộng đồng</p>
                    </div>
                </div>
                <div className="right-nav flex justify-between items-center">
                    <div className='mr-2'><Badge content='5'><i className="nav-icon fas fa-bell"></i></Badge></div>
                    <div><i className="nav-icon fas fa-comments-alt"></i></div>
                    <div className='font-bold'>
                        {userInfo ? (
                            <Menu>
                                <MenuHandler>
                                <div className='flex'>
                                    <img src={userInfo.avatar} className='avatar' />
                                    <p className='py-2 px-2'>{userInfo.name}</p>
                                </div>
                                </MenuHandler>
                                <MenuList>
                                    <MenuItem>Menu Item 1</MenuItem>
                                    <MenuItem>Menu Item 2</MenuItem>
                                    <MenuItem onClick={onClickLogout}>Đăng xuất</MenuItem>
                                </MenuList>
                                </Menu>    
                        ) : (
                            <div className='flex'>
                                <i className="nav-icon fas fa-user-circle"></i>
                                <Link to='/login' className=''>Đăng nhập/ Đăng ký</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Dialog open={openDialogLogout} handler={()=>{setOpenDialogLogout(!openDialogLogout)}}>
        <DialogHeader>Đăng xuất.</DialogHeader>
        <DialogBody>
          Bạn có chắc chắn muốn đăng xuất?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={()=>{setOpenDialogLogout(!openDialogLogout)}}
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
        </>
    );
}

export default Home;
