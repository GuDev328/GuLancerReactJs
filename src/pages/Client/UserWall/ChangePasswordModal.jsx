/* eslint-disable react/prop-types */
import React from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import MyModal from "./../../../components/core/MyModal";
import userServices from "../../../services/userServices";

const ChangePasswordModal = ({ open, setOpen }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (values.newPassword !== values.confirmPassword) {
        message.error("Mật khẩu mới và xác nhận mật khẩu không khớp");
        return;
      }

      const response = await userServices.changePassword(values);
      if (response.status === 200) {
        message.success("Đổi mật khẩu thành công");
        setOpen(false);
        form.resetFields();
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <MyModal
      title="Đổi mật khẩu"
      open={open}
      onCancel={() => setOpen(false)}
      onConfirm={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="oldPassword"
          label="Mật khẩu cũ"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Nhập mật khẩu cũ"
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="Mật khẩu mới"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu mới!" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Nhập mật khẩu mới"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Xác nhận mật khẩu mới"
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Xác nhận mật khẩu mới"
          />
        </Form.Item>
      </Form>
    </MyModal>
  );
};

export default ChangePasswordModal;
