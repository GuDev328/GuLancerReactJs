import { Avatar, Drawer, Flex, Space } from "antd";
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import MyButton from "@/components/core/MyButton";
import taskServices from "../../../../services/taskServices";
import { useState } from "react";
import { formatDateTime } from "../../../../utils/common";
import { renderJSXTaskStatus } from "../../../../utils/render";
import { EditOutlined } from "@ant-design/icons";
import ModalCUTask from "./ModalCUTask";
const DrawerTask = ({ open, onClose, id, setReRender }) => {
    const [data, setData] = useState(null);
    const [reRenderDetail, setReRenderDetail] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const fetchData = async () => {
        const res = await taskServices.getDetailTask(id);
        setData(res.result);
    };

    React.useEffect(() => {
        if (open && id) {
            fetchData();
        }
    }, [id, open, reRenderDetail]);

    React.useEffect(() => {
        setReRender((pre) => !pre);
    }, [reRenderDetail, setReRender]);

    const isMobile = useSelector((state) => state.screen.isMobile);
    const handleClose = () => {
        onClose();
    };

    return (
        <div>
            <Drawer
                width={isMobile ? "100%" : "60%"}
                open={open}
                title={"Chi tiết công việc"}
                footer={
                    <Flex justify="end">
                        <MyButton onClick={() => setOpenModal(true)} size="sm">
                            <EditOutlined /> Chỉnh sửa
                        </MyButton>
                    </Flex>
                }
                onClose={handleClose}
            >
                <div className="text-[17px] font-bold">{data?.title}</div>
                <Flex align="center" gap={8}>
                    <p>Người làm:</p>
                    <Avatar src={data?.assign_to_info[0]?.avatar} />
                    <p>{data?.assign_to_info[0]?.name}</p>
                </Flex>
                <Flex align="center" gap={8}>
                    <p>Người tạo:</p>
                    <Avatar src={data?.created_by_info[0]?.avatar} />
                    <p>{data?.created_by_info[0]?.name}</p>
                </Flex>
                <Flex align="center" gap={8}>
                    <p>Ngày tạo:</p>
                    <p> {formatDateTime(data?.created_at)}</p>
                </Flex>
                <Flex align="center" gap={8}>
                    <p>Hạn dự kiến:</p>
                    <p> {formatDateTime(data?.deadline)}</p>
                </Flex>
                <Flex align="center" gap={8}>
                    <p>Trạng thái:</p>
                    <p> {renderJSXTaskStatus(data?.status)}</p>
                </Flex>
                <Space className="m-3">{data?.description}</Space>
            </Drawer>
            <ModalCUTask
                setReRender={setReRenderDetail}
                data={data}
                open={openModal}
                onCancel={() => setOpenModal(false)}
                onOk={() => setOpenModal(false)}
            />
        </div>
    );
};

DrawerTask.propTypes = {
    id: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    setReRender: PropTypes.func,
};

export default DrawerTask;
