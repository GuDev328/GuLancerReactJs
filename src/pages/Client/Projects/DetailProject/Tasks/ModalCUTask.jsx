import React, { useEffect, useState } from "react";
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
import taskServices from "@/services/taskServices";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import PropTypes from "prop-types";
const ModalCUTask = ({ data, open, onCancel, onOk, setReRender }) => {
  const [form] = Form.useForm();
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

  useEffect(() => {
    if (data) {
      console.log(data);
      form.setFieldsValue({
        ...data,
        deadline: dayjs(data.deadline),
      });
    }
  }, [open, data]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (!data) {
      const dataCreate = {
        ...values,
        project_id: id,
      };
      const res = await taskServices.createTask(dataCreate);
      if (res.status === 200) {
        form.resetFields();
        message.success("Tạo công việc thành công");
      }
    } else {
      const dataUpdate = {
        ...values,
        _id: data._id,
      };
      const res = await taskServices.updateTask(dataUpdate);
      if (res.status === 200) {
        form.resetFields();
        message.success("Chỉnh sửa công việc thành công");
      }
    }
    setReRender && setReRender((pre) => !pre);
  };

  const handleOk = async () => {
    await handleSubmit();
    onOk();
  };

  return (
    <MyModal
      width={600}
      centered
      title={data ? "Chỉnh sửa công việc" : "Tạo công việc"}
      open={open}
      onCancel={onCancel}
      onConfirm={handleOk}
    >
      <Form
        //handleSubmit={handleSubmit}
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
  );
};

ModalCUTask.propTypes = {
  data: PropTypes.object,
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  setReRender: PropTypes.func,
};

export default ModalCUTask;
