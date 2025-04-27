import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import logo from "/logo.png";
import authServices from "../../services/authServices";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";

function RegisterSuccess() {
  return (
    <div className="flex w-full h-screen justify-content-center items-center ">
      <div className="container mx-auto p-3 my-5">
        <div className="flex flex-row">
          <div className="hidden lg:block lg:w-6/12">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>

          <div className="w-full lg:w-6/12 flex justify-center items-center flex-col">
            <img
              className="mx-auto w-3/4 lg:w-full"
              style={{ width: "300px" }}
              src={logo}
              alt=""
            />
            <p className="text-center my-5">
              Chúc mừng bạn đã đăng ký tài khoản thành công. <br />
              Chúng tối đã gửi mật khẩu đến địa chỉ email của bạn. Bạn hãy vui
              lòng kiểm tra email và tiến hành đăng nhập.
            </p>
            <a href="https://mail.google.com/">
              <Button className="bg-main focus:outline-none">
                Đi đến Gmail ngay
              </Button>
            </a>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RegisterSuccess;
