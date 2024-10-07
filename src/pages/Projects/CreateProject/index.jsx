import { Col, Divider, Form, Input, message, Row, Select, Space } from "antd";
import React, { useEffect } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { Button } from "@material-tailwind/react";
import MyButton from "../../../components/core/MyButton";
import projectServices from "../../../services/projectServices";
import { useNavigate } from "react-router-dom";
const CreateProject = () => {
    const [description, setDescription] = React.useState("");
    const [form] = Form.useForm();
    const [fieldsOptions, setFieldsOptions] = React.useState([]);
    const [techsOptions, setTechsOptions] = React.useState([]);
    const [newTech, setNewTech] = React.useState("");
    const [newField, setNewField] = React.useState("");
    const navigateTo = useNavigate();

    const fetchOptions = async () => {
        const fields = await projectServices.getAllFields();
        const techs = await projectServices.getAllTechs();
        setFieldsOptions(
            fields.result.map((field) => ({
                label: field.name,
                value: field.name,
            }))
        );
        setTechsOptions(
            techs.result.map((field) => ({
                label: field.name,
                value: field.name,
            }))
        );
    };
    useEffect(() => {
        fetchOptions();
    }, []);

    const handleAddTech = () => {
        setTechsOptions([...techsOptions, { label: newTech, value: newTech }]);
        setNewTech("");
    };
    const handleAddField = () => {
        setFieldsOptions([
            ...fieldsOptions,
            { label: newField, value: newField },
        ]);
        setNewField("");
    };

    const handleSubmit = async () => {
        await form.validateFields();
        const data = await form.getFieldsValue();
        const res = await projectServices.createProject(data);
        if (res.status === 200) {
            message.success("Tạo dự án thành công!");
            navigateTo("/projects");
            await form.resetFields();
        }
    };

    const projectTypesOptions = [
        {
            label: "Trả theo dự án",
            value: 0,
        },
        {
            label: "Trả theo giờ",
            value: 1,
        },
    ];

    return (
        <div className="bg-white mx-10 rounded-xl px-5 py-3 my-5">
            <p className="font-bold text-[20px] mb-3">Tạo dự án mới </p>
            <Form
                form={form}
                labelAlign="left"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 20 }}
            >
                <Form.Item
                    name={"title"}
                    label="Tên dự án"
                    rules={[
                        {
                            required: true,
                            message: "Tên dự án không được để trống",
                        },
                    ]}
                >
                    <Input placeholder="--Nhập--" />
                </Form.Item>
                <Form.Item
                    required
                    name="fields"
                    rules={[
                        {
                            required: true,
                            message: "Lĩnh lực không được để trống",
                        },
                    ]}
                    label="Lĩnh vực"
                >
                    <Select
                        options={fieldsOptions}
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider
                                    style={{
                                        margin: "8px 0",
                                    }}
                                />
                                <Space
                                    style={{
                                        padding: "0 8px 4px",
                                    }}
                                >
                                    <Input
                                        maxLength={30}
                                        onChange={(e) =>
                                            setNewField(e.target.value)
                                        }
                                        placeholder="--Nhập--"
                                    />
                                    <MyButton
                                        onClick={handleAddField}
                                        size="sm"
                                    >
                                        Thêm lĩnh vực
                                    </MyButton>
                                </Space>
                            </>
                        )}
                        showSearch
                        allowClear
                        mode="multiple"
                        placeholder="--Chọn--"
                    />
                </Form.Item>
                <Form.Item
                    required
                    name="technologies"
                    rules={[
                        {
                            required: true,
                            message: "Công nghệ không được để trống",
                        },
                    ]}
                    label="Công nghệ sử dụng"
                >
                    <Select
                        options={techsOptions}
                        dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider
                                    style={{
                                        margin: "8px 0",
                                    }}
                                />
                                <Space
                                    style={{
                                        padding: "0 8px 4px",
                                    }}
                                >
                                    <Input
                                        onChange={(e) =>
                                            setNewTech(e.target.value)
                                        }
                                        value={newTech}
                                        maxLength={30}
                                        placeholder="--Nhập--"
                                    />
                                    <MyButton onClick={handleAddTech} size="sm">
                                        Thêm Công nghệ
                                    </MyButton>
                                </Space>
                            </>
                        )}
                        showSearch
                        allowClear
                        mode="multiple"
                        placeholder="--Chọn--"
                    />
                </Form.Item>
                <Row gutter={10}>
                    <Col span={12}>
                        <Form.Item
                            initialValue={0}
                            name="salaryType"
                            label="Loại dự án"
                            required
                        >
                            <Select
                                options={projectTypesOptions}
                                placeholder="--Chọn--"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            rules={[
                                {
                                    required: true,
                                    message: "Lương không được để trống",
                                },
                            ]}
                            required
                            name="salary"
                            label="Lương"
                        >
                            <Input addonAfter="VNĐ" placeholder="--Nhập--" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Mô tả dự án">
                    <Input className="hidden"></Input>
                </Form.Item>
                <Form.Item
                    wrapperCol={24}
                    name="description"
                    valuePropName="value"
                >
                    <MarkdownEditor
                        value={description}
                        minHeight="300px"
                        onChange={(value) => setDescription(value)}
                    />
                </Form.Item>
            </Form>
            <div className="flex justify-end">
                <Button className="bg-main" onClick={handleSubmit}>
                    Xác nhận
                </Button>
            </div>
        </div>
    );
};

export default CreateProject;
