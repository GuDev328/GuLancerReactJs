import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeNavbar from './Home';
import { Button, Chip, Input } from '@material-tailwind/react';
import { Routes, Route } from 'react-router-dom';

function FindJob() {
    
    return (
        <>
            
            <div className='flex flex-col justify-center items-center bg-gradient-to-r from-blue-300 to-cyan-300' style={{height: '45%'}}>
                
                    <div className='w-3/5 mb-4 font-bold' style={{color: 'white', fontSize: '32px'}}> ... Dự án IT cho Freelancer  </div>
                    <div className='w-3/5 flex'>
                        <input className='border w-full pl-6 text border-gray-300 rounded-md font-bold '  placeholder='Nhập từ khoá theo dự án, kỹ năng, ...' />
                        <Button color="blue" buttonType="filled" className='w-1/5 ml-2 h-14 font-bold' ><i className="fas fa-search mr-2"></i>Tìm kiếm</Button>
                    </div>
                    <div className='w-3/5 mt-10 font-bold' style={{color: 'white', fontSize: '17px'}}> Gợi ý cho bạn:  
                        <Chip value='Nodejs' className='inline-block m-1'></Chip>
                        <Chip value='Nodejs' className='inline-block m-1'></Chip>
                        <Chip value='Nodejs' className='inline-block m-1'></Chip>
                        <Chip value='Nodejs' className='inline-block m-1'></Chip>
                        <Chip value='Nodejs' className='inline-block m-1'></Chip>
                        <Chip value='Nodejs' className='inline-block m-1'></Chip>

                    </div>
                
                
                
            </div>
        </>
    );
}

export default FindJob;
