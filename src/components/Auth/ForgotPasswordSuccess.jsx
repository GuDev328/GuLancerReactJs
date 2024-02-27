import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import logo from "/logo.png";
import authServices from "../../services/authServices";
import Cookies from "js-cookie";
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input } from '@material-tailwind/react';

function ForgotPasswordSuccess() {

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
                        <p className="text-center my-5">
                        Chúng tôi đã gửi một email xác thực thay đổi mật khẩu đến địa chỉ email của bạn. Bạn hãy vui lòng kiểm tra email. <br/>Lưu ý email này chỉ có giá trị trong vòng 1 tiếng kể từ bây giờ.

                        </p>
                        <a href='https://mail.google.com/'>
                            <Button className='bg-main focus:outline-none'>Đi đến Gmail ngay</Button>
                        </a>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ForgotPasswordSuccess;
