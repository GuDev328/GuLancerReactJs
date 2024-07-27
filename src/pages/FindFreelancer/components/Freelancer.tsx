import { Button } from "@material-tailwind/react";
import { Avatar, Rate } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const Freelancer = () => {
    //const isMobile = useSelector((state) => state.screen.isMobile);
    return (
        <div className="relative mb-2 flex justify-between bg-white w-[100%] rounded-3xl md:pb-10 xl:pb-5 p-5">
            <div className="flex xl:w-[45%]">
                <div className="w-[55px]">
                    <Avatar className="" size={55} />
                </div>
                <div className="">
                    <p className="ml-1 text-[18px] mt-2">Phạm Tiến Đạt</p>
                    <div className="flex items-center">
                        <p className="bg-[#ffb800] px-1 text-[15px] rounded-lg text-white">
                            4.9
                        </p>

                        <Rate
                            className="text-[18px]"
                            disabled
                            defaultValue={2}
                        />
                        <p className="ml-1 text-[13px] text-main">
                            120 đánh giá
                        </p>
                        <p className="  ml-1 text-[13px] text-main">
                            123 dự án đã hoàn thành
                        </p>
                    </div>

                    <p className="text-[13px]" style={{ color: "#31c740" }}>
                        <i className="fa-light mr-1 fa-ballot-check"></i>
                        Đã xác thực
                    </p>
                    <p className="hidden md:block text-[15px] text-main">
                        <span className="text-black">Lĩnh vực :</span>
                        Xây dựng Website, Thiết kế, Trí tuệ nhân tạo, Xây dựng
                        Website, Thiết kế, Trí tuệ nhân tạo
                    </p>
                    <p className="hidden md:block text-[15px] text-main">
                        <span className="text-black">Công nghệ :</span>
                        Xây dựng Website, Thiết kế, Trí tuệ nhân tạo, Xây dựng
                        Website, Thiết kế, Trí tuệ nhân tạo
                    </p>
                </div>
            </div>
            <p className="hidden self-center xl:block lg:w-[40%] max-h-[130px] overflow-hidden text-ellipsis">
                Lorem ipsum dolor sit amet, consectetur adipisci elit, sed
                eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrum exercitationem ullam corporis
                suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.
                Quis aute iure reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint obcaecat
                cupiditat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
            </p>
            <div className=" hidden xl:flex w-[150px]  flex-col items-end">
                <Button size="sm" className="bg-main">
                    <i className="text-[18px] mr-1 far fa-comment-alt-lines"></i>
                    Liên hệ ngay
                </Button>
                <p className="text-gray-600">500,000đ 1 giờ</p>
                <p className="pl-8 mt-4 text-[15px] text-gray-600">
                    8 dự án trung bình hoàn thành mỗi tháng
                </p>
            </div>
            <Button
                size="sm"
                className="bg-main absolute xl:hidden  bottom-2 right-4 "
            >
                Xem chi tiết
            </Button>
        </div>
    );
};

export default Freelancer;
