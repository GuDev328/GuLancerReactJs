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

export default function EscrowModal({ data, open, onCancel, onConfirm }) {
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
      amount: val.amount,
      project_id: data.project_id,
      member_project_id: data._id,
    };
    console.log(dataFormat);
    const res = await projectServices.escrow(dataFormat);
    if (res.status === 200) {
      message.success("Cập nhật thành công");
      onConfirm();
      form.resetFields();
    }
  };
  if (data !== undefined)
    return (
      <MyModal
        title="Ký quỹ"
        open={open}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      >
        <div className="flex items-center">
          <span>Ký quỹ cho:</span>
          <Image
            src={data.user_info[0].avatar}
            width={40}
            className=" rounded-full"
          />
          <div>{data.user_info[0].name}</div>
        </div>
        <div>
          Giai đoạn {data.currentPhase.no}/ {data.milestone_info.length}
        </div>
        <div>
          <span>Trạng thái: </span>
          {renderStatusTagPhaseProject(data.currentPhase.status)}
        </div>
        <div>
          <span>Số tiền cho giai đoạn hiện tại: </span>
          {formatCurrency(data.currentPhase.salary)}
        </div>
        <div>
          <span>Số tiền đã ký quỹ: </span>
          {formatCurrency(data.escrowed)}{" "}
        </div>
        <Form form={form}>
          <div className="mt-2">
            <MyFormItemInput
              type="number"
              name="amount"
              isRequired
              label="Số tiền ký quỹ thêm"
              form={form}
            />
          </div>
        </Form>
      </MyModal>
    );
}

EscrowModal.propTypes = {
  data: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
