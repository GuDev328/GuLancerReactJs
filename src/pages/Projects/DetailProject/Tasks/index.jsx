import React from "react";
import MyButton from "@/components/core/MyButton";
import MyModal from "@/components/core/MyModal";
import MyDatePicker from "@/components/core/MyDatePicker";
import { DatePicker, Flex, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Select, Avatar } from "antd";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import projectServices from "@/services/projectServices";
import TableTask from "./TableTask";
import taskServices from "../../../../services/taskServices";

const Tasks = () => {
    const [form] = Form.useForm();
    const [isOpenModal, setIsOpenModal] = React.useState(false);
    const { id } = useParams();

    const queryMember = useQuery({
        queryKey: ["member", id],
        queryFn: () => projectServices.getMember(id),
    });
    const optionMember = queryMember.data?.result.map((member) => ({
        label: (
            <Flex align="center" gap={8}>
                <Avatar src={member.avatar} />
                <span>{member.name}</span>
            </Flex>
        ),

        value: member._id,
    }));

    const handleSubmit = async () => {
        const values = await form.validateFields();
        const data = {
            ...values,
            project_id: id,
        };

        const res = await taskServices.createTask(data);
        if (res.status === 200) {
            form.resetFields();
            message.success("Tạo công việc thành công");
        }
    };

    const handleOkModal = async () => {
        await handleSubmit();

        //setIsOpenModal(false);
    };
    return (
        <div className="relative">
            <Flex justify="end" className="mb-2 mr-5 absolute right-0 ">
                <MyButton size="sm" onClick={() => setIsOpenModal(true)}>
                    <PlusOutlined /> Tạo công việc
                </MyButton>
            </Flex>
            <TableTask />
            <MyModal
                width={600}
                centered
                title="Tạo công việc"
                open={isOpenModal}
                onCancel={() => setIsOpenModal(false)}
                onConfirm={handleOkModal}
            >
                <Form
                    handleSubmit={handleSubmit}
                    labelCol={{ span: 5 }}
                    form={form}
                >
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên công việc",
                            },
                        ]}
                        label="Tên công việc"
                        name="title"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn người gán công việc",
                            },
                        ]}
                        label="Gán cho"
                        name="assign_to"
                    >
                        <Select options={optionMember} />
                    </Form.Item>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng chọn thời hạn dự kiến",
                            },
                        ]}
                        label="Thời hạn dự kiến"
                        name="deadline"
                    >
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
