import {
    Modal,
    Form,
    Input,
    Select,
    Upload,
    message,
    Button,
    Image,
} from "antd";
import React from "react";
import PropTypes from "prop-types";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import mediaServices from "../../../services/mediaServices";

const CreateGroupModal = ({ open, setOpen }) => {
    const { form } = Form.useForm();
    const [fileList, setFileList] = React.useState([]);

    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
    };

    const handleUpload = async ({ fileList }) => {
        setFileList(fileList);
    };

    const handleCreate = async () => {
        const upImage = await mediaServices.uploadImage(
            fileList[0].poriginFileObj
        );
        console.log(upImage);
    };

    return (
        <Modal
            open={open}
            centered
            width="70%"
            maskClosable={false}
            cancelText="Huỷ"
            onCancel={handleCancel}
            onClose={handleCancel}
            title="Tạo mới cộng đồng"
            footer={
                <>
                    <Button size="sm" onClick={handleCancel}>
                        Hủy
                    </Button>
                    <Button
                        className="ml-2 text-white bg-main"
                        size="sm"
                        onClick={handleCreate}
                    >
                        Tạo
                    </Button>
                </>
            }
        >
            <Form form={form} labelCol={{ span: 3 }}>
                <Form.Item label="Ảnh nền" valuePropName="fileList">
                    <Upload
                        listType="picture-card"
                        beforeUpload={() => false}
                        fileList={fileList}
                        maxCount={1}
                        onChange={handleUpload}
                    >
                        {fileList.length >= 1 ? null : (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
                <Form.Item required name="name" label="Tên nhóm">
                    <Input />
                </Form.Item>

                <Form.Item name="type" initialValue={0} label="Loại cộng đồng">
                    <Select
                        defaultValue={0}
                        options={[
                            { label: "Công khai", value: 0 },
                            { label: "Riêng tư", value: 1 },
                        ]}
                    ></Select>
                </Form.Item>
                <Form.Item name="description" label="Mô tả ">
                    <TextArea />
                </Form.Item>
            </Form>
        </Modal>
    );
};

CreateGroupModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};

export default CreateGroupModal;
