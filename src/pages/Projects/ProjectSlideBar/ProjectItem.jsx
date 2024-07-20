import React from "react";
import { Avatar } from "antd";

const ProjectItem = () => {
    return (
        <div className="bg-shadow my-1 rounded-lg p-2">
            <div className="text-[16px]">
                Xây dựng website bán sách với NodeJs
            </div>
            <div className="flex justify-between">
                <div className="flex items-center">
                    <Avatar size={25} />
                    <p className="ml-1 text-[13px]">Phạm Tiến Đạt</p>
                </div>
                <div className="flex items-center text-main">5,000,000đ</div>
            </div>
        </div>
    );
};

export default ProjectItem;
