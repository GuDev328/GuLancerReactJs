import React from "react";
import { Avatar, Tabs } from "antd";
import OverviewProject from "./Overview";

const ProjectTabs = [
    {
        key: "overview",
        label: "Tổng quan",
        children: <OverviewProject />,
        icon: <i className="fa-regular fa-layer-group"></i>,
    },
    {
        key: "member",
        label: "Thành viên",
        children: "",
        icon: <i className=" fa-regular fa-people-group"></i>,
    },
    {
        key: "tasks",
        label: "Các công việc",
        children: "",
        icon: <i className="fa-regular fa-boxes-stacked"></i>,
    },
    {
        key: "issues",
        label: "Các vấn đề",
        children: "",
        icon: <i className="far fa-bug"></i>,
    },
    {
        key: "resources",
        label: "Các tài nguyên",
        children: "",
        icon: <i className="fa-light fa-folder-closed"></i>,
    },
];

const DetailProject = () => {
    return (
        <div className="bg-white w-full rounded-xl p-3 pt-0">
            <div className="flex font-bold justify-between items-center text-[21px]">
                <p>Xây dựng Website bán sách với NodeJS</p>
                <div className="leading-5 mt-2">
                    <p className=" text-main">5,000,000đ</p>
                    <p className="text-gray-400 text-[14px] font-normal">
                        Trả theo dự án
                    </p>
                </div>
            </div>

            <div className="flex items-center ">
                <Avatar className="" size={40} />
                <div className=" leading-none ml-1 mt-[13px]">
                    <div className=" flex items-end">
                        <p className="mr-1">Phạm Tiến Đạt</p>
                        <i
                            className=" fa-solid fa-star"
                            style={{ color: "#FFB800" }}
                        ></i>
                        <p>4.9/5.0</p>
                        <p className=" hidden sm:inline-block ml-1 text-[13px] text-gray-500">
                            Với 123 dự án đã hoàn thành
                        </p>
                    </div>
                    <p className="text-[13px]" style={{ color: "#31c740" }}>
                        <i className="fa-light mr-1 fa-ballot-check"></i>
                        Đã xác thực
                    </p>
                </div>
            </div>

            <div className="text-[21px] font-sans ml-5">
                <Tabs
                    size="large"
                    defaultActiveKey="overview"
                    items={ProjectTabs}
                    tabBarExtraContent={
                        <i className="text-[20px] mx-3 mt-4 fa-duotone fa-solid fa-bars"></i>
                    }
                />
            </div>
        </div>
    );
};

export default DetailProject;
