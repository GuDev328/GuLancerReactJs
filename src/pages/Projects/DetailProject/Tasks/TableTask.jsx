import { useQuery } from "@tanstack/react-query";
import { message, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import taskServices from "../../../../services/taskServices";
import { useParams } from "react-router-dom";
import { renderJSXTaskStatus } from "../../../../utils/render";
import Search from "./Search";
import DrawerTask from "./DrawerTask";
import PropTypes from "prop-types";
import dayjs from "dayjs";
const TableTask = ({ reRender, setReRender }) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { id } = useParams();
    const [dataSearch, setDataSearch] = useState({});
    const fetchData = useCallback(async () => {
        const data = await taskServices.getAllTask({
            project_id: id,
            page,
            limit,
            ...dataSearch,
        });
        setData(data.result);
        setPage(data.page);
    }, [dataSearch, page, limit, id]);

    useEffect(() => {
        fetchData();
    }, [dataSearch, fetchData, reRender]);

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            width: 70,
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên công việc",
            dataIndex: "title",
            key: "tilte",
            ellipsis: true,
        },
        {
            title: "Người làm việc",
            dataIndex: "assign_to_info",
            key: "assign_to_info",
            width: 200,
            render: (text, record) => {
                return (
                    <div className="flex items-center">
                        <img
                            src={record.assign_to_info[0].avatar}
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                        />
                        <p className="ml-2">{record.assign_to_info[0].name}</p>
                    </div>
                );
            },
        },

        {
            title: "Hạn dự kiến",
            dataIndex: "deadline",
            key: "deadline",
            width: 130,
            render: (text, record) => {
                return <p>{dayjs(record?.deadline).format("DD/MM/YYYY")}</p>;
            },
        },
        {
            width: 150,
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (text) => {
                return renderJSXTaskStatus(text);
            },
        },
    ];
    return (
        <div>
            <Search setDataSearch={setDataSearch} />
            <Table
                pagination={{
                    current: page,
                    pageSize: limit,
                    total: data.length,
                    showTotal: (total) => `Tổng: ${total} điểm dừng`,
                    showSizeChanger: true,
                    locale: { items_per_page: "/trang" },
                    onChange: (page, size) => {
                        setPage(page);
                        setLimit(size);
                    },
                }}
                scroll={{ x: 1000 }}
                onRow={(record) => ({
                    onClick: () => {
                        setSelectedId(record._id);
                        setOpenDrawer(true);
                    },
                    style: { cursor: "pointer" },
                })}
                dataSource={data}
                columns={columns}
            ></Table>
            <DrawerTask
                setReRender={setReRender}
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                id={selectedId}
            />
        </div>
    );
};

TableTask.propTypes = {
    reRender: PropTypes.bool,
    setReRender: PropTypes.func,
};

export default TableTask;
