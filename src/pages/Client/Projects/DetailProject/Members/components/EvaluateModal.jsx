import React, { useState } from "react";
import { Modal, Rate, Input, Form, Avatar } from "antd";
import PropTypes from "prop-types";
import { renderUserVerifyStatus } from "../../../../../../utils/render";
import MyButton from "../../../../../../components/core/MyButton";

export default function EvaluateModal({ open, onCancel, onSubmit, member }) {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Viết đánh giá"
      open={open}
      onCancel={onCancel}
      footer={
        <div className="flex gap-2 justify-end">
          <MyButton
            type="primary"
            onClick={handleSubmit}
            size="sm"
            className="bg-[#333] text-white"
          >
            Huỷ
          </MyButton>

          <MyButton
            type="primary"
            size="sm"
            onClick={handleSubmit}
            className="bg-main text-white"
          >
            Gửi đánh giá
          </MyButton>
        </div>
      }
    >
      <div className="flex">
        <Avatar src={member?.avatar} className="" size={45} />
        <div className="">
          <p className="ml-1 text-[18px] mt-2">{member?.name}</p>
          <div className="flex items-center">
            <p className="bg-[#ffb800] px-1 rounded-lg text-white">
              {member?.star.$numberDecimal}
            </p>
            <Rate
              allowHalf
              disabled
              defaultValue={Number(member?.star.$numberDecimal)}
            />
            <p className="ml-1 text-[13px] text-main">
              {member?.evaluationCount} đánh giá
            </p>
            <p className="hidden sm:inline-block ml-1 text-[13px] text-main">
              Với {member?.projectsDone} dự án đã hoàn thành
            </p>
          </div>
          {renderUserVerifyStatus(member?.verified_info.status)}
        </div>
      </div>
      <Form form={form} layout="vertical">
        <Form.Item
          name="rating"
          label="Đánh giá"
          rules={[{ required: true, message: "Vui lòng chọn đánh giá" }]}
        >
          <Rate allowHalf />
        </Form.Item>
        <Form.Item
          name="comment"
          label="Nhận xét"
          rules={[{ required: true, message: "Vui lòng nhập nhận xét" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Nhập nhận xét của bạn về người này..."
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

EvaluateModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  member: PropTypes.object.isRequired,
};
