import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Avatar, Button, Chip, Input } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { Spin } from "antd";
import groupServices from "../../../services/groupServices";
import CreateGroupModal from "./CreateGroupModal";

function ControlCommunity() {
    const [keySeachGroup, setKeySeachGroup] = useState("");
    const [openCreateGroupModal, setOpenCreateGroupModal] = useState(false);
    const [updateGroups, setUpdateGroups] = useState(false);
    const getGroups = useQuery({
        queryKey: ["getListGroup"],
        queryFn: groupServices.getGroups,
    });
    const navigateTo = useNavigate();
    useEffect(() => {}, [updateGroups]);

    return (
        <>
            <ToastContainer stacked />
            <div className="">
                <div className="controlCard bg-white m-3 flex flex-col items-center rounded-lg">
                    <div className="flex w-[100%] justify-between items-center p-5 pb-2">
                        <p className="text-[23px]  font-bold">Cộng đồng</p>
                        <i className="fa-duotone text-main fa-gears text-[27px] "></i>
                    </div>
                    <div className="relative flex w-[90%] max-w-[24rem]">
                        <Input
                            type="text"
                            label="Tìm cộng đồng"
                            value={keySeachGroup}
                            onChange={(e) => setKeySeachGroup(e.target.value)}
                            className="p-5"
                        />
                        <Button
                            size="sm"
                            disabled={!keySeachGroup}
                            className="!absolute right-1 top-1 rounded bg-main"
                        >
                            <i className="fa-light fa-magnifying-glass mr-1"></i>
                            Tìm kiếm
                        </Button>
                    </div>

                    <div className="w-[90%] m-2 rounded-md h-12 bg-[#F0F2F5] flex items-center">
                        <i className="fa-light text-[27px] ml-5 mr-3 fa-newspaper"></i>
                        <p className=" font-bold">Bảng tin</p>
                    </div>

                    <div className="w-[90%] m-2 mt-0 rounded-md h-12 bg-[#F0F2F5] flex items-center">
                        <i className="fa-duotone fa-users text-[23px] ml-5 mr-3"></i>
                        <p className=" font-bold">Nhóm của bạn</p>
                    </div>
                </div>

                <div className="ownerGroup bg-white m-3 flex flex-col items-center rounded-lg">
                    <div className="flex w-[100%] justify-between items-center p-5 pb-2">
                        <p className="text-[23px]  font-bold">
                            Cộng đồng bạn quản lý
                        </p>
                    </div>
                    <Spin spinning={getGroups.isLoading} />
                    {getGroups.data?.result?.map((group) => {
                        if (group.isAdmin) {
                            return (
                                <div
                                    key={group._id}
                                    onClick={() =>
                                        navigateTo(`/community/${group._id}`)
                                    }
                                    className="w-[90%] cursor-pointer m-2 mt-0 rounded-md h-12 py-2 bg-[#F0F2F5] flex items-center"
                                >
                                    <Avatar
                                        src={group.cover_photo}
                                        className=" mr-3 w-[45px] h-[45px]"
                                        alt="avatar"
                                        variant="rounded"
                                    />
                                    <p className="font-medium">{group.name}</p>
                                </div>
                            );
                        }
                    })}

                    <Button
                        onClick={() => setOpenCreateGroupModal(true)}
                        className="bg-main mb-2 w-[250px]"
                        size="sm"
                    >
                        Tạo mới cộng đồng
                    </Button>
                </div>

                <div className="myGroup bg-white m-3 flex flex-col items-center rounded-lg">
                    <div className="flex w-[100%] justify-between items-center p-5 pb-2">
                        <p className="text-[23px]  font-bold">
                            Cộng đồng đã tham gia
                        </p>
                    </div>
                    <Spin spinning={getGroups.isLoading} />
                    {getGroups.data?.result?.map((group) => {
                        if (!group.isAdmin) {
                            return (
                                <div
                                    key={group._id}
                                    className="w-[90%] m-2 mt-0 rounded-md h-12 py-2 bg-[#F0F2F5] flex items-center"
                                >
                                    <Avatar
                                        src={group.cover_photo}
                                        className=" mr-3 w-[45px] h-[45px]"
                                        alt="avatar"
                                        variant="rounded"
                                    />
                                    <p className="font-medium">{group.name}</p>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
            <CreateGroupModal
                open={openCreateGroupModal}
                setOpen={setOpenCreateGroupModal}
                setUpdateGroups={setUpdateGroups}
            />
        </>
    );
}

export default ControlCommunity;
