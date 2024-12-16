import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import taskServices from "../../../../services/taskServices";
import { useParams } from "react-router-dom";
import { renderJSXTaskStatus } from "../../../../utils/render";
import Search from "./Search";

const TableTask = () => {
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
    }, [dataSearch, page, limit]);

    useEffect(() => {
        fetchData();
    }, [dataSearch, fetchData]);

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
                return <p>{new Date(record.deadline).toLocaleDateString()}</p>;
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
            <Table dataSource={data} columns={columns}></Table>
        </div>
    );
};

export default TableTask;
