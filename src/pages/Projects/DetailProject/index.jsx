import React from "react";
import { Avatar, Tabs } from "antd";
import OverviewProject from "./Overview";
import Members from "./Members";
import { useQuery } from "@tanstack/react-query";
import projectServices from "../../../services/projectServices";
import { useParams } from "react-router-dom";
import { formatCurrency } from "../../../utils/common";

const DetailProject = () => {
    const { id } = useParams();
    const getDetailProject = useQuery({
        queryKey: ["getDetailProject", id],
        queryFn: () => projectServices.getDetailProject(id),
    });

    const detailProject = getDetailProject.data?.result[0];
    const ProjectTabs = [
        {
            key: "overview",
            label: "Tổng quan",
            children: <OverviewProject detailProject={detailProject} />,
            icon: <i className="fa-regular fa-layer-group"></i>,
        },
        {
            key: "member",
            label: "Thành viên",
            children: <Members />,
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
    ];
    return (
        <div className="bg-white  m-3 rounded-xl p-3 pt-0">
            <div className="flex font-bold justify-between items-center text-[21px]">
                <p>{detailProject?.title}</p>
                <div className="leading-5 mt-2">
                    <p className=" text-main">
                        {detailProject
                            ? formatCurrency(detailProject?.salary)
                            : "0"}
                    </p>
                    <p className="text-gray-400 text-[14px] font-normal">
                        {detailProject?.salaryType === 0
                            ? "Trả theo dự án"
                            : "Trả theo giờ"}
                    </p>
                </div>
            </div>

            <div className="flex items-center ">
                <Avatar
                    className="w-[40px] h-[40px]"
                    src={detailProject?.admin_info[0]?.avatar}
                    size={40}
                />
                <div className=" leading-none ml-1 mt-[13px]">
                    <div className=" flex items-end">
                        <p className="mr-1">
                            {detailProject?.admin_info[0]?.name}
                        </p>
                        <i
                            className=" fa-solid fa-star"
                            style={{ color: "#FFB800" }}
                        ></i>
                        <p>{detailProject?.admin_info[0]?.star}/5.0</p>
                        <p className=" hidden sm:inline-block ml-1 text-[13px] text-gray-500">
                            Với {detailProject?.admin_info[0]?.project_done} dự
                            án đã hoàn thành
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
