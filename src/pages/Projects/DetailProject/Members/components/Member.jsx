import React from "react";
import { Avatar, Rate } from "antd";

const Member = () => {
    return (
        <div>
            <div className="inline-block items-center font-sans m-1 mx-5 p-3 rounded-xl bg-shadow ">
                <p>Team Lead</p>
                <div className="flex">
                    <Avatar className="" size={45} />
                    <div className="">
                        <p className="ml-1 text-[18px] mt-2">Phạm Tiến Đạt</p>
                        <div className="flex items-center">
                            <p className="bg-[#ffb800] px-1 rounded-lg text-white">
                                4.9
                            </p>
                            <Rate disabled defaultValue={2} />
                            <p className="ml-1 text-[13px] text-main">
                                120 đánh giá
                            </p>
                        </div>
                        <p className=" hidden sm:inline-block ml-1 text-[13px] text-main">
                            Với 123 dự án đã hoàn thành
                        </p>
                        <p className="text-[13px]" style={{ color: "#31c740" }}>
                            <i className="fa-light mr-1 fa-ballot-check"></i>
                            Đã xác thực
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Member;
