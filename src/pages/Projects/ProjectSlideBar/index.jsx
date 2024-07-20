import React from "react";
import { Select, Option } from "@material-tailwind/react";
import ProjectItem from "./ProjectItem";

const ProjectSlideBar = () => {
    return (
        <div className=" px-3 pb-2 rounded-xl bg-white">
            <div className="mb-2">
                <Select
                    className="text-[22px] font-bold text-black font-sans"
                    variant="static"
                    size="lg"
                    value={0}
                >
                    <Option value={0}>Tất cả dự án</Option>
                    <Option>Các dự án đang chờ</Option>
                    <Option>Các dự án đang tiến hành</Option>
                    <Option>Các dự án tạm dừng</Option>
                    <Option>Các dự án đã hoàn thành</Option>
                </Select>
            </div>
            <div className="">
                <ProjectItem />
                <ProjectItem />
                <ProjectItem />
            </div>
        </div>
    );
};

export default ProjectSlideBar;
