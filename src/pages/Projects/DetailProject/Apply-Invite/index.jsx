import { Avatar, Modal, Rate, Table } from "antd";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import projectServices from "../../../../services/projectServices";
import MyModal, { showConfirmModal } from "../../../../components/core/MyModal";
import { formatCurrency } from "../../../../utils/common";
import { toast } from "react-toastify";

const ApplyInviteManagement = ({ projectId }) => {
    const [open, setOpen] = useState(false);
    const [selectedApply, setSelectedApply] = useState(null);
    const data = useQuery({
        queryKey: ["apply-invite", projectId],
        queryFn: () =>
            projectServices.getApplyInvite({
                project_id: projectId,
                page: 1,
                limit: 10,
            }),
    });
    const dataTable = data?.data?.result?.data;
    console.log(dataTable);
    const ViewContent = (content) => {
        setSelectedApply(content);
        setOpen(true);
    };

    const handleAccept = async (id) => {
        showConfirmModal({
            content: "Bạn có chắc chắn muốn chấp nhận ứng tuyển này?",
            onOk: async () => {
                const response = await projectServices.acceptApplyInvite(id);
                console.log(response);
                if (response.status === 200) {
                    toast.success("Chấp nhận ứng tuyển thành công");
                    Modal.destroyAll();
                    data.refetch();
                } else {
                    toast.error("Chấp nhận ứng tuyển thất bại");
                }
            },
        });
    };

    const handleReject = async (id) => {
        showConfirmModal({
            content: "Bạn có chắc chắn muốn từ chối ứng tuyển này?",
            onOk: async () => {
                const response = await projectServices.rejectApplyInvite(id);
                console.log(response);
                if (response.status === 200) {
                    toast.success("Từ chối ứng tuyển thành công");
                    Modal.destroyAll();
                    data.refetch();
                } else {
                    toast.error("Từ chối ứng tuyển thất bại");
                }
            },
        });
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Người ứng tuyển",
            dataIndex: "personApply",
            key: "personApply",
            render: (text, record) => {
                return (
                    <div className="flex items-center">
                        <img
                            src={record.user_info[0].avatar}
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <p className="ml-2">{record.user_info[0].name}</p>
                    </div>
                );
            },
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (text, record) => {
                return <p>{record.user_info[0].email}</p>;
            },
        },
        {
            title: "Ngày ứng tuyển",
            dataIndex: "applyDate",
            key: "applyDate",
            render: (text, record) => {
                return (
                    <p>{new Date(record.created_at).toLocaleDateString()}</p>
                );
            },
        },
        {
            title: "Lương ứng tuyển",
            dataIndex: "salary",
            key: "salary",
            render: (text, record) => {
                return <p>{record.salary}</p>;
            },
        },
        {
            title: "Ngày dự kiến hoàn thành",
            dataIndex: "expectedEndDate",
            key: "expectedEndDate",
            render: (text, record) => {
                return (
                    <p>
                        {new Date(record.time_to_complete).toLocaleDateString()}
                    </p>
                );
            },
        },
        {
            title: "Hành động",
            dataIndex: "action",
            fixed: "right",
            align: "center",
            key: "action",
            render: (text, record) => (
                <div className="flex justify-center">
                    <i
                        onClick={() => ViewContent(record)}
                        className="far cursor-pointer text-lg
                      fa-eye text-blue-500 mr-2"
                    ></i>
                    <i
                        onClick={() => handleAccept(record._id)}
                        className="far cursor-pointer text-lg fa-check-circle text-green-500 mr-2"
                    ></i>
                    <i
                        onClick={() => handleReject(record._id)}
                        className="far cursor-pointer text-lg fa-times-circle text-red-500"
                    ></i>
                </div>
            ),
        },
    ];

    return (
        <>
            <Table
                loading={data.isLoading}
                columns={columns}
                dataSource={dataTable}
            />

            <Modal
                open={open}
                footer={null}
                onCancel={() => setOpen(false)}
                title="Chi tiết ứng tuyển"
                centered
            >
                <div>
                    <div className="flex ">
                        <div className="w-[45px]">
                            <Avatar
                                className=""
                                src={selectedApply?.user_info[0]?.avatar}
                                size={45}
                            />
                        </div>
                        <div className="">
                            <div className="flex">
                                <p className="ml-1 text-[16px] font-medium mr-2">
                                    {selectedApply?.user_info[0]?.name}
                                </p>
                                <p className="text-gray-600 text-[14px] font-medium">
                                    @{selectedApply?.user_info[0]?.username}
                                </p>
                            </div>
                            <div className="flex items-center">
                                <p className="bg-[#ffb800] px-1 text-[14px] rounded-lg text-white">
                                    {selectedApply?.user_info[0]?.star}
                                </p>

                                <Rate
                                    className="text-[14px]"
                                    disabled
                                    defaultValue={
                                        selectedApply?.user_info[0]?.star
                                    }
                                />
                                <p className="ml-1 text-[13px] text-main">
                                    120 đánh giá
                                </p>
                                <p className="  ml-1 text-[13px] text-main">
                                    {selectedApply?.user_info[0]?.project_done}{" "}
                                    dự án đã hoàn thành
                                </p>
                            </div>

                            <p
                                className="text-[13px]"
                                style={{ color: "#31c740" }}
                            >
                                <i className="fa-light mr-1 fa-ballot-check"></i>
                                Đã xác thực
                            </p>
                        </div>
                    </div>
                    <div className="flex">
                        <p className="font-medium mr-2 ">Email: </p>
                        <p>{selectedApply?.user_info[0].email}</p>
                    </div>

                    <p className="font-medium">Nội dung ứng tuyển: </p>
                    <p>{selectedApply?.content}</p>

                    <div className="flex">
                        <p className="font-medium mr-2">Lương ứng tuyển: </p>
                        <p className="font-medium">
                            {selectedApply?.salary
                                ? formatCurrency(selectedApply?.salary)
                                : "Theo mô tả"}
                        </p>
                    </div>
                    <div className="flex">
                        <p className="font-medium mr-2">
                            Ngày dự kiến hoàn thành:{" "}
                        </p>
                        <p>
                            {selectedApply?.time_to_complete
                                ? new Date(
                                      selectedApply?.time_to_complete
                                  ).toLocaleDateString()
                                : "Theo mô tả"}
                        </p>
                    </div>
                    <div className="flex">
                        <p className="font-medium mr-2">Ngày ứng tuyển: </p>
                        <p>
                            {selectedApply?.created_at
                                ? new Date(
                                      selectedApply?.created_at
                                  ).toLocaleDateString()
                                : "Theo mô tả"}
                        </p>
                    </div>
                </div>
            </Modal>
        </>
    );
};

ApplyInviteManagement.propTypes = {
    projectId: PropTypes.string.isRequired,
};

export default ApplyInviteManagement;
