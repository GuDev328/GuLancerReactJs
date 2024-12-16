import { DatePicker, Form, Input, Select, Flex } from "antd";
import { useForm } from "antd/es/form/Form";
import MyButton from "@/components/core/MyButton";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { Avatar } from "antd";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import projectServices from "@/services/projectServices";
const Search = ({ setDataSearch }) => {
    const [form] = useForm();
    const { id } = useParams();
    const queryMember = useQuery({
        queryKey: ["member", id],
        queryFn: () => projectServices.getMember(id),
    });

    const optionMember = queryMember.data?.result.map((member) => ({
        label: (
            <Flex align="center" gap={8}>
                <Avatar
                    style={{ width: "20px", height: "20px" }}
                    src={member.avatar}
                />
                <span>{member.name}</span>
            </Flex>
        ),

        value: member._id,
    }));

    const statusOption = [
        {
            label: "Chưa thực hiện",
            value: 0,
        },
        {
            label: "Đang xử lý",
            value: 1,
        },
        {
            label: "Đã hoàn thành",
            value: 2,
        },
        {
            label: "Đã huỷ",
            value: 3,
        },
    ];

    const handleSearch = async () => {
        const dataForm = await form.validateFields();
        console.log(dataForm);
        const data = {
            ...dataForm,
            deadline_from: dataForm?.deadline ? dataForm?.deadline[0] : "",
            deadline_to: dataForm?.deadline ? dataForm?.deadline[1] : "",
        };
        setDataSearch(data);
    };
    return (
        <div>
            <Form className="flex gap-2 " layout="horizontal" form={form}>
                <Form.Item name="title">
                    <Input placeholder="Tên công việc" />
                </Form.Item>
                <Form.Item name="status">
                    <Select
                        mode="multiple"
                        style={{ minWidth: "150px" }}
                        maxTagCount={1}
                        placeholder="Trạng thái"
                        options={statusOption}
                    />
                </Form.Item>
                <Form.Item name="assign_to">
                    <Select
                        options={optionMember}
                        style={{ minWidth: "150px" }}
                        mode="multiple"
                        maxTagCount={1}
                        placeholder="Người làm"
                    />
                </Form.Item>
                <Form.Item name="deadline">
                    <DatePicker.RangePicker
                        format={"DD/MM/YYYY"}
                        placeholder={["Hạn từ", "đến"]}
                    />
                </Form.Item>
                <div>
                    <MyButton size="sm" onClick={handleSearch}>
                        <SearchOutlined /> Tìm kiếm
                    </MyButton>
                </div>
            </Form>
        </div>
    );
};

Search.propTypes = {
    setDataSearch: PropTypes.func,
};

export default Search;
