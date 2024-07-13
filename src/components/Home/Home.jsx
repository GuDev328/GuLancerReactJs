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
    DialogFooter, Avatar } from "@material-tailwind/react";
import FindJob from './FindJob';
import Community from './Community';
import MyProjects from './MyProjects';

function Home() {
    const [chooseItem, setChooseItem] = useState('');
    const [userInfo, setUserInfo] = useState(JSON.parse(Cookies.get("user")? Cookies.get("user") : null));
    const [openDialogLogout, setOpenDialogLogout] = useState(false);
    const accessToken = Cookies.get("accessToken");
    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (token && !userInfo) {
            userServices.getMe()
        }
        if(!userInfo && Cookies.get("user")){
            setUserInfo(JSON.parse(Cookies.get("user")))
        }
        if(userInfo && userInfo.role==='0') setChooseItem('FindJob')
        if(userInfo && userInfo.role==='1') setChooseItem('FindFreelancer')

    },[])

    const onClickLogout = () => {
        setOpenDialogLogout(true)
    }

    const handleLogout = async() => {
        setOpenDialogLogout(false)
        await authServices.logout()
        setUserInfo()
    }
    return (
        <>
            <div className="nav flex justify-between items-center">
                <div className="left-nav sz:block flex justify-between items-center">
                    <img className="logo" src={logo} alt="Logo" />
                    {!userInfo && 
                    <div className='flex'>
                        <div
                        className={` hidden md:flex items-center item  ${chooseItem === "FindJob" ? "item-active" : ""}`}
                        onClick={() => setChooseItem("FindJob")}
                        >
                        <i className="nav-icon fas fa-search"></i>
                        <p className='font-bold'>Tìm Job</p>
                        </div>
                        <div
                            className={`hidden md:flex item items-center ${chooseItem === "FindFreelancer" ? "item-active" : ""}`}
                            onClick={() => setChooseItem("FindFreelancer")}
                            >
                             <i className="nav-icon fas fa-search"></i>
                                <p className='font-bold'>Tìm Freelancer</p>
                        </div>
                    </div>
                    
                    }
                    {userInfo && userInfo.role==='0'? <div
                        className={` hidden md:flex items-center item  ${chooseItem === "FindJob" ? "item-active" : ""}`}
                        onClick={() => setChooseItem("FindJob")}
                    >
                        <i className="nav-icon fas fa-search"></i>
                        <p className='font-bold'>Tìm Job</p>
                    </div>: 
                    <div
                    >
                </div>
                    }

                {userInfo && userInfo.role==='1'? <div
                    className={`hidden md:flex item items-center ${chooseItem === "FindFreelancer" ? "item-active" : ""}`}
                    onClick={() => setChooseItem("FindFreelancer")}
                >
                    <i className="nav-icon fas fa-search"></i>
                    <p className='font-bold'>Tìm Freelancer</p>
                </div>: <div></div>
                    
                    }
                    
                {userInfo && 
                <div
                className={`  hidden md:flex item items-center  ${chooseItem === "Community" ? "item-active" : ""}`}
                onClick={() => {setChooseItem("Community")}}
            >
                <i className="nav-icon fas fa-users"></i>
                <p className='font-bold'>Cộng đồng</p>
            </div>
                    }
                {userInfo && 
                <div
                className={`  hidden md:flex item items-center  ${chooseItem === "MyProjects" ? "item-active" : ""}`}
                onClick={() => {setChooseItem("MyProjects")}}
            >
                <i className="nav-icon fas fa-cabinet-filing"></i>
                <p className='font-bold'>Các dự án </p>
            </div>
                    }      
                    
                </div>
                <div className="right-nav flex justify-between items-center">
                    <div className='mr-2'><Badge content='5'><i className="nav-icon fas fa-bell"></i></Badge></div>
                    <div><i className="nav-icon fas fa-comments-alt"></i></div>
                    <div className='font-bold'>
                        {userInfo ? (
                            <Menu>
                                <MenuHandler>
                                <div className='flex items-center'>
                                    <Avatar withBorder={true} className="p-0.5" size='md' src={userInfo.avatar} />
                                    <p className='py-2 hidden md:block px-2'>{userInfo.name}</p>
                                </div>
                                </MenuHandler>
                                <MenuList>
                                    <MenuItem><i className="fas fa-id-card mr-2"></i>  Trang cá nhân</MenuItem>
                                    <MenuItem><i className="fas fa-cogs mr-2"></i> Cài đặt</MenuItem>
                                    <MenuItem onClick={onClickLogout}><i className="fad fa-sign-out-alt mr-2"></i> Đăng xuất</MenuItem>
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
            <div className='h-14'></div>
            {chooseItem && <div className='w-full h-full'>
                {chooseItem==='FindJob'&& <FindJob />}
                {chooseItem==='Community'&& <Community />}
                {chooseItem=== 'MyProjects' && <MyProjects />}

            </div>         
            }













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
