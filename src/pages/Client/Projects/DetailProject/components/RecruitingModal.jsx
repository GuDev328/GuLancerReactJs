import React from "react";
import PropTypes from "prop-types";
import MyFormItemInput from "../../../../../components/core/MyFormItemInput";
import MyModal from "../../../../../components/core/MyModal";
import { Form } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useEffect } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import projectServices from "../../../../../services/projectServices";
import { toast } from "react-toastify";
import { message } from "antd";
import { renderStatusTagPhaseProject } from "../../../../../utils/render";
import { formatCurrency } from "@/utils/common";
import { Image } from "antd";

export default function RecruitingModal({
  project_id,
  open,
  onCancel,
  onConfirm,
}) {
  const [form] = useForm();
  useEffect(() => {}, [open]);
  const handleCancel = () => {
    onCancel();
    setTimeout(() => {
      form.resetFields();
    }, 200);
  };
  const handleConfirm = async () => {
    const val = await form.validateFields();
    const dataFormat = {
      ...val,
      project_id,
    };
    const res = await projectServices.toRecruiting(dataFormat);
    if (res.status === 200) {
      message.success("Đang tuyển dụng nhân sự");
      onConfirm();
      form.resetFields();
    }
  };
  return (
    <MyModal
      title="Thông tin tuyển dụng nhân sự"
      open={open}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    >
      <Form form={form}>
        <div className="mt-2">
          <MyFormItemInput
            type="number"
            name="number_people"
            isRequired
            label="Số nhân sự cần tuyển dụng"
            form={form}
          />
          <MyFormItemInput
            type="date"
            name="deadline"
            isRequired
            label="Hạn ứng tuyển"
            form={form}
          />
        </div>
      </Form>
    </MyModal>
  );
}

RecruitingModal.propTypes = {
  open: PropTypes.bool.isRequired,
  project_id: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
