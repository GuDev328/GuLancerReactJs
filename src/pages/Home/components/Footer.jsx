import React from "react";

function Footer(props) {
    return (
        <div className="px-5  md:px-24 py-5 bg-main bg-opacity-80 text-white">
            <div className=" flex flex-wrap md:flex-row justify-between   ">
                <div className="flex flex-col items-center">
                    <img className="w-[160px]" src="/logo-white.png" alt="" />
                    <div className="mb-5">
                        <div className="flex items-center  my-1">
                            <i className="mr-1 text-[20px] fal fa-globe"></i>
                            <p className="text-[15px]">Việt Nam/ Tiếng Việt</p>
                        </div>
                        <div className="flex items-center my-1">
                            <i className="mr-1 text-[20px] fas fa-question-circle"></i>
                            <p className="text-[15px]">Giúp đỡ & hỗ trợ</p>
                        </div>
                        <div className="flex items-center my-1">
                            <i className="mr-1 text-[20px] fas fa-walking"></i>
                            <p className="text-[15px]">Trợ năng</p>
                        </div>
                    </div>
                </div>

                <div className="mb-5">
                    <p className="font-bold text-[16px]">Freelancer</p>
                    <p className="text-[14px]">Các lĩnh vực</p>
                    <p className="text-[14px]">Dự án</p>
                    <p className="text-[14px]">Cuộc thi</p>
                    <p className="text-[14px]">Chương trình Freelancer</p>
                    <p className="text-[14px]">Đăng ký xác thực</p>
                    <p className="text-[14px]">Ưa thích</p>
                    <p className="text-[14px]">Quản lý dự án</p>
                </div>
                <div className="mb-5">
                    <p className="font-bold text-[16px]">Giới thiệu</p>
                    <p className="text-[14px]">Về chúng tối</p>
                    <p className="text-[14px]">Cách thức hoạt động</p>
                    <p className="text-[14px]">Bảo mật</p>
                    <p className="text-[14px]">Nhà đầu tư</p>
                    <p className="text-[14px]">Các câu chuyện</p>
                    <p className="text-[14px]">Tin tức</p>
                    <p className="text-[14px]">Đội ngũ</p>
                    <p className="text-[14px]">Giải thưởng</p>
                </div>

                <div className="mb-5">
                    <p className="font-bold text-[16px]">Điều khoản</p>
                    <p className="text-[14px]">Chính sách riêng tư</p>
                    <p className="text-[14px]">Điều khoản và điều kiện</p>
                    <p className="text-[14px]">Chính sách bản quyền</p>
                    <p className="text-[14px]">Quy tắc ứng xử</p>
                    <p className="text-[14px]">Biểu phí dịch vụ</p>
                </div>
                <div className="mb-5">
                    <p className="font-bold text-[16px]">Ứng dụng</p>
                    <img
                        className=" w-[170px]"
                        src="/getAppGooglePlay.png"
                        alt=""
                    />
                    <img
                        className="ml-3 w-[150px]"
                        src="/getAppAppStore.png"
                        alt=""
                    />
                    <div className="flex justify-around mt-2">
                        <i className="text-[25px] fab fa-facebook-square"></i>
                        <i className="text-[25px] fab fa-youtube"></i>
                        <i className="text-[25px] fab fa-instagram-square"></i>
                        <i className="text-[25px] fab fa-twitter-square"></i>
                    </div>
                </div>
            </div>
            <hr />
            <div className="flex justify-between flex-wrap px-3 items-center">
                <div className="flex my-1">
                    <div className="mr-10">
                        <p className="font-bold">1.234.567</p>
                        <p>Người dùng đã đăng ký</p>
                    </div>
                    <div className="">
                        <p className="font-bold">1.234.567</p>
                        <p>Việc làm đã đăng</p>
                    </div>
                </div>
                <div className="text-[13px]">
                    Freelancer ® is a registered Trademark of Freelancer
                    Technology Pty Limited (ACN 142 189 759)
                    <br /> Copyright © 2024 Freelancer Technology Pty Limited
                    (ACN 142 189 759)
                </div>
            </div>
        </div>
    );
}

export default Footer;
