import React from "react";
import MyButton from "@/components/core/MyButton";
import MyModal from "@/components/core/MyModal";
import MyDatePicker from "@/components/core/MyDatePicker";
import { DatePicker, Flex } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Select, Avatar } from "antd";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import projectServices from "@/services/projectServices";

const Tasks = () => {
    const [form] = Form.useForm();
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const { id } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: ["member", id],
        queryFn: () => projectServices.getMember(id),
    });
    console.log(data);
    const optionMember = data?.result.map((member) => ({
        label: (
            <Flex align="center" gap={8}>
                <Avatar src={member.avatar} />
                <span>{member.name}</span>
            </Flex>
        ),
        value: member._id,
    }));
    return (
        <div>
            <Flex justify="end" className="mb-2 mr-5">
                <MyButton size="sm" onClick={() => setIsOpenModal(true)}>
                    <PlusOutlined /> Tạo công việc
                </MyButton>
            </Flex>

            <MyModal
                centered
                title="Tạo công việc"
                open={isOpenModal}
                onCancel={() => setIsOpenModal(false)}
                onOk={() => setIsOpenModal(false)}
            >
                <Form labelCol={{ span: 5 }} form={form}>
                    <Form.Item label="Tên công việc" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Gán cho" name="assign_to">
                        <Select options={optionMember} />
                    </Form.Item>
                    <Form.Item label="Thời hạn dự kiến" name="deadline">
                        <MyDatePicker />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </Form>
            </MyModal>
        </div>
    );
};

export default Tasks;
