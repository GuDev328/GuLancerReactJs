import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { Select, Option, Button } from "@material-tailwind/react";
import ProjectItem from "@/pages/Projects/components/ProjectItem";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import projectServices from "../../../services/projectServices";
import { Spin } from "antd";
function ListProject() {
    const naviagteTo = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const getMyProject = useQuery({
        queryKey: ["getMyProject", 1, 10],
        queryFn: () =>
            projectServices.getMyProject({
                page: 1,
                limit: 10,
                type: 0,
            }),
    });

    const listProject = getMyProject.data?.result.data;
    return (
        <div className="flex my-3 justify-center">
            <div className=" px-3 w-[95%]  pb-2 rounded-xl bg-white">
                {userInfo?.role === 1 && (
                    <Button
                        onClick={() => naviagteTo("create")}
                        on
                        size="sm"
                        className="w-full mt-3 bg-main"
                    >
                        <i className="fas fa-plus"></i> Tạo dự án mới
                    </Button>
                )}

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
                {getMyProject.isLoading ? (
                    <Spin spinning={true}></Spin>
                ) : (
                    <div className="">
                        {listProject?.length > 0 ? (
                            listProject?.map((item) => (
                                <div
                                    key={item._id}
                                    className="cursor-pointer"
                                    onClick={() =>
                                        naviagteTo(
                                            `/projects/detail/${item._id}`
                                        )
                                    }
                                >
                                    <ProjectItem data={item} />
                                </div>
                            ))
                        ) : (
                            <div className="text-center place-content-center h-[50vh] text-gray-500">
                                Chưa có dự án nào
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListProject;
