import React from "react";
import { Avatar } from "antd";

const Comment = () => {
    return (
        <div className="flex items-start bg-[#eff2f5] my-1 p-1 rounded-3xl">
            <div className="w-[35px]">
                <Avatar size={35} />
            </div>
            <div className="text-[14px] max-w-[90%] lg:max-w-[700px] mt-2">
                <div className="font-bold mx-2">Phạm Tiến Đạt</div>
                <div className="mx-2 leading-4">
                    a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a
                    a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a
                    a a a a a a a a a a a a
                </div>
                <div className="mr-2 flex font-bold text-gray-600">
                    <p className="mr-5">Thích</p>
                    <p>Trả lời</p>
                </div>
            </div>
        </div>
    );
};

export default Comment;
