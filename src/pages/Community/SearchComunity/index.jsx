import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Tabs } from "antd";

import { useParams } from "react-router-dom";
import searchServices from "../../../services/searchServices";
import { Spin } from "antd";
import ResultGroup from "./ResultGroup";

const SearchCommunity = () => {
    const { keySearch } = useParams();
    const [loading, setLoading] = React.useState(true);
    const [users, setUsers] = React.useState([]);
    const [groups, setGroups] = React.useState([]);
    const fetchData = () => {
        setLoading(true);
        searchServices
            .searchCommunity({
                keySearch,
                page: 1,
                limit: 10,
            })
            .then((res) => {
                setGroups(res.result.groups);
                setUsers(res.result.users);
                setLoading(false);
            });
    };
    React.useEffect(() => {
        fetchData();
    }, [keySearch]);

    if (loading)
        return <Spin className="w-full mt-[30vh] h-full" spinning></Spin>;

    const itemTab = [
        {
            label: <p className=" font-bold">Cộng đồng</p>,
            key: 1,
            children: <ResultGroup data={groups} />,
        },
        {
            label: <p className=" font-bold">Người dùng</p>,
            key: 2,
            children: `Content of Tab Pane 2`,
        },
    ];

    return (
        <div className="w-11/12 px-5 bg-white rounded-xl my-3">
            <Tabs defaultActiveKey="1" centered items={itemTab} />
        </div>
    );
};

export default SearchCommunity;
