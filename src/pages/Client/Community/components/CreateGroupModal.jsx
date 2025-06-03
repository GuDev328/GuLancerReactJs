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
import mediaServices from "@/services/mediaServices";
import groupServices from "@/services/groupServices";
import { Button as Button2 } from "@material-tailwind/react";

import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Flex } from "antd";

const CreateGroupModal = ({ open, setOpen }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const queryClient = useQueryClient();

  const createGroupM = useMutation({
    mutationFn: groupServices.createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries(["getListGroup"]);
    },
  });

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const handleUpload = async ({ fileList }) => {
    setFileList(fileList);
  };

  const handleCreate = async () => {
    await form.validateFields();
    setLoading(true);
    const values = await form.getFieldsValue();
    const data = {
      ...values,
      cover_photo:
        "https://gulancer.s3.ap-southeast-1.amazonaws.com/images/168b01bba582d1916e257f100.png",
    };
    if (fileList[0]) {
      const upImage = await mediaServices.uploadImage(
        fileList[0].originFileObj
      );
      data.cover_photo = upImage.result[0].url;
    }
    await createGroupM.mutate(data);
    setLoading(false);
    handleCancel();
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
        <Flex justify="end">
          <Button2 size="sm" onClick={handleCancel}>
            Hủy
          </Button2>
          <Button2
            loading={loading}
            className="ml-2 text-white bg-main"
            size="sm"
            onClick={handleCreate}
          >
            Tạo
          </Button2>
        </Flex>
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
        <Form.Item
          required
          name="name"
          rules={[{ required: true, message: "Nhập tên cộng đồng" }]}
          label="Tên nhóm"
        >
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
  setUpdateGroups: PropTypes.func.isRequired,
};

export default CreateGroupModal;
