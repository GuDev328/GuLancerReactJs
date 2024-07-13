import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeNavbar from './Home';
import { useState } from "react";
import { Avatar, Button, Chip, Input } from '@material-tailwind/react';
import { Routes, Route } from 'react-router-dom';

function Community() {
    const [keySeachGroup, setKeySeachGroup] = useState("");
    return (
        <>
            <div className='h-full fixed' style={{width: '360px', borderRight: "2px solid #f0f0f0"}}>
                <div className="fixed block" style={{width: '360px', paddingBottom: "20px" ,borderBottom: "2px solid #f0f0f0"}}>
                    <div className='font-bold mt-3 ml-5' style={{fontSize: '25px'}}>Cộng đồng</div>
                    <div className="relative" style={{width: '90%', marginLeft: '5%'}}>
                        <Input
                            value={keySeachGroup}
                            onChange={(e) => setKeySeachGroup(e.target.value)}
                            placeholder="Nhập từ khóa tìm kiếm"
                            
                        />
                        <Button
                            size="sm"
                            style={{backgroundColor: '#6c7ee1', color: 'white'}}
                            disabled={!keySeachGroup}
                            className="!absolute right-1 top-1 rounded"
                        >
                            <i className="fas fa-search"></i>Tìm kiếm
                        </Button>
                        </div>
                </div>
                <div className='h-28'></div>
               <div className='' style={{maxHeight: 'calc(100vh - 180px)', overflowY:'auto'}}>
                    <div style={{borderBottom: '2px solid #ebebed', paddingBottom: '10px'}}>
                    <Button className='bg-white w-full text-left text-main-color p-4' style={{fontSize: '15px'}} >
                        <i className="mr-5 fas fa-newspaper" style={{fontSize: '20px'}}></i>
                        <p className='inline-block normal-case' style={{color: "#333"}}>Bảng tin</p>
                    </Button> 
                    <Button className='bg-white w-full text-left text-main-color p-4' style={{fontSize: '15px'}} >
                        <i className="mr-5 fas fa-users" style={{fontSize: '20px'}}></i>
                        <p className='inline-block normal-case' style={{color: "#333"}}>Nhóm của bạn</p>
                    </Button> 
                    <Button className=' bg-main-color text-white p-2 w-4/5 mt-2' style={{marginLeft: "10%",fontSize: '15px'}} >
                    <i className="fas fa-plus"></i>
                        <p className='inline-block normal-case font-thin ml-2 '>Tạo nhóm mới</p>
                    </Button>
                    </div>

                    <div style={{borderBottom: '2px solid #ebebed', paddingBottom: '10px'}}>
                        <p className='font-bold ml-4 mt-3'>Nhóm do bạn quản lý</p>
                        <div className='h-14 flex items-center'>
                            <Avatar variant='rounded' className='ml-4'  src=''></Avatar>
                            <p style={{width: '270px', fontSize: '15px'}} className='font-bold text-wrap ml-4'>Nhóm nhóm Nhóm nhóm Nhóm nhóm Nhóm nhóm Nhóm nhóm</p>
                        </div>
                    </div>

                    <div style={{borderBottom: '2px solid #ebebed', paddingBottom: '10px'}}>
                        <p className='font-bold ml-4 mt-3'>Nhóm bạn đã tham gia</p>
                        <div className='h-14 flex items-center'>
                            <Avatar variant='rounded' className='ml-4'  src=''></Avatar>
                            <p style={{width: '270px', fontSize: '15px'}} className='font-bold text-wrap ml-4'>Nhóm nhóm Nhóm nhóm Nhóm nhóm Nhóm nhóm Nhóm nhóm</p>
                        </div>
                    </div>
               
                </div> 
                
            </div>
        </>
    );
}

export default Community;
