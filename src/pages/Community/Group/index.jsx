import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import groupServices from "../../../services/groupServices";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { data } from "jquery";

const Group = () => {
    const { id } = useParams();
    const fetchDetailGroup = useQuery({
        queryKey: ["getGroupById", id],
        queryFn: async () => await groupServices.getGroupById(id),
        onError: (error) => console.error(error),
    });
    const detaiGroup = fetchDetailGroup?.data?.result;
    return (
        <div className="mt-3 h-10 w-[98%] bg-blue-gray-600">
            <Spin className="min-h-96" spinning={fetchDetailGroup?.isLoading}>
                <div className="Banner relative">
                    <img
                        src={detaiGroup?.cover_photo}
                        className="h-72 rounded-bl-xl rounded-br-xl w-full object-cover object-center"
                    />
                    <div className="absolute w-full flex items-center py-3 pl-4 text-white  rounded-bl-xl rounded-br-xl bg-main bottom-0">
                        <p className="font-bold text-[22px] ">
                            {detaiGroup?.name}
                        </p>
                        {detaiGroup?.type === 0 ? (
                            <p className=" ml-2 text-[14px]">
                                <i className="fad fa-globe-asia"></i> Nhóm công
                                khai
                            </p>
                        ) : (
                            <p className=" ml-2 text-[14px]">
                                <i className="fad fa-lock-alt"></i> Nhóm riêng
                                tư
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex mt-3">
                    <div className="w-full md:w-[73%]"></div>
                    <div className="rounded-lg p-3 hidden md:block bg-white md:w-[25%]">
                        <p className="font-bold text-[19px] mb-2">Giới thiệu</p>
                        <p className="text-[15px] mb-1">
                            {detaiGroup?.description}
                        </p>
                        {detaiGroup?.type === 0 ? (
                            <>
                                <p className="mb-1 font-bold text-[19px]">
                                    <i className="fad fa-globe-asia"></i> Công
                                    khai
                                </p>
                                <p className="text-[15px] ml-5">
                                    Mọi người đều có thể nhìn thấy mọi người
                                    trong nhóm và những gì họ đăng.
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="mb-1 font-bold text-[19px]">
                                    <i className="fad fa-lock-alt mr-2"></i>{" "}
                                    Riêng tư
                                </p>
                                <p className="text-[15px] ml-5">
                                    Chỉ thành viên mới nhìn thấy mọi người trong
                                    nhóm và những gì họ đăng.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </Spin>
        </div>
    );
};

export default Group;
