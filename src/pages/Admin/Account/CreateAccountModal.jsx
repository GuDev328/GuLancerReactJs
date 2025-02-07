import React from "react";
import PropTypes from "prop-types";
import MyModal from "../../../components/core/MyModal";
import { Form, Row } from "antd";
import { Button, Input, Select, Option } from "@material-tailwind/react";
import MyFormItemInput from "../../../components/core/MyFormItemInput";

export default function CreateAccountModal({ open, onCancel, onConfirm }) {
  const [form] = Form.useForm();
  const handleConfirm = async () => {
    await form.validateFields();
    const dataForm = form.getFieldsValue();
    const res = await onConfirm(dataForm);
    console.log(res);
    if (res) {
      form.resetFields();
    }
  };
  return (
    <MyModal
      title="Tạo mới tài khoản"
      open={open}
      onCancel={onCancel}
      onConfirm={handleConfirm}
    >
      <Form form={form}>
        <MyFormItemInput
          rules={[
            {
              type: "email",
              message: "Email không hợp lệ",
            },
          ]}
          isRequired
          name="email"
          label="Email"
          form={form}
        />
        <div className="md:flex md:justify-between">
          <MyFormItemInput
            name="username"
            isRequired
            label="Username"
            form={form}
          />
          <MyFormItemInput name="name" isRequired label="Họ tên" form={form} />
        </div>
        <div className="md:flex md:justify-between">
          <MyFormItemInput
            name="date_of_birth"
            isRequired
            type="date"
            label="Ngày sinh"
            form={form}
          />
          <MyFormItemInput
            name="gender"
            isRequired
            type="select"
            label="Giới tính"
            selectOptions={[
              { value: "0", label: "Nam" },
              { value: "1", label: "Nữ" },
            ]}
            form={form}
          />
        </div>
        <div className="md:flex md:justify-between">
          <MyFormItemInput
            name="phone_number"
            isRequired
            label="Số điện thoại"
            form={form}
          />
          <MyFormItemInput
            name="role"
            isRequired
            type="select"
            label="Vai trò"
            selectOptions={[
              { value: 0, label: "Freelancer" },
              { value: 1, label: "Employer" },
              { value: 3, label: "Admin" },
            ]}
            form={form}
          />
        </div>
        <MyFormItemInput
          name="location"
          isRequired
          label="Địa chỉ"
          form={form}
        />
      </Form>
    </MyModal>
  );
}

CreateAccountModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
