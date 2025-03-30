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
import MyFormItemInput from "../../../../components/core/MyFormItemInput";
import { Checkbox } from "antd";
import { DisputeResolveAction } from "../../../../constant/project";
import { Radio } from "antd";
import projectServices from "../../../../services/projectServices";
import { useParams } from "react-router-dom";

const percentAmounts = [
  { value: 25, label: "25% số tiền" },
  { value: 50, label: "50% số tiền" },
  { value: 70, label: "70% số tiền" },
  { value: 85, label: "85% số tiền" },
  { value: 0, label: "Tuỳ chỉnh" },
];

const ResolveModal = ({ open, setOpen, type, amountTotal = 0 }) => {
  const [form] = Form.useForm();
  const { dispute_id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [percentAmount, setPercentAmount] = React.useState(0);
  const queryClient = useQueryClient();

  //   const createGroupM = useMutation({
  //     mutationFn: groupServices.createGroup,
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["getListGroup"]);
  //     },
  //   });

  const handlePayAll = async (description) => {
    const response = await projectServices.resolvePayAllDispute(dispute_id, {
      description,
    });
    if (response.status === 200) {
      message.success("Thanh toán cho Freelancer thành công");
      queryClient.invalidateQueries(["dispute", dispute_id]);
    }
  };
  const handlePayPart = async (description, amount) => {
    const response = await projectServices.resolvePayPartDispute(dispute_id, {
      description,
      amount,
    });
    if (response.status === 200) {
      message.success("Thanh toán một phần thành công");
      queryClient.invalidateQueries(["dispute", dispute_id]);
    }
  };
  const handleNotPay = async (description) => {
    const response = await projectServices.resolveNotPayDispute(dispute_id, {
      description,
    });
    if (response.status === 200) {
      message.success("Tiếp tục công việc mà chưa thanh toán thành công");
      queryClient.invalidateQueries(["dispute", dispute_id]);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const handleCreate = async () => {
    await form.validateFields();
    const amount = form.getFieldValue("amount");
    const description = form.getFieldValue("description");
    if (Number(amount) <= 0 || Number(amount) > amountTotal) {
      message.error("Số tiền không hợp lệ");
      return;
    }
    setLoading(true);
    switch (type) {
      case DisputeResolveAction.PayAll:
        await handlePayAll(description);
        break;
      case DisputeResolveAction.PayPart:
        await handlePayPart(description, Number(amount));
        break;
      case DisputeResolveAction.Continue:
        await handleNotPay(description);
        break;
    }
    setLoading(false);
    handleCancel();
  };

  const handleChangePercentAmount = (e) => {
    setPercentAmount(e.target.value);
    form.setFieldsValue({
      amount: (amountTotal * e.target.value) / 100,
    });
  };

  return (
    <Modal
      open={open}
      centered
      maskClosable={false}
      cancelText="Huỷ"
      onCancel={handleCancel}
      onClose={handleCancel}
      title={
        type === DisputeResolveAction.PayAll
          ? "Thanh toán cho Freelancer"
          : type === DisputeResolveAction.PayPart
          ? "Thanh toán một phần, tiếp tục công việc"
          : "Tiếp tục công việc mà chưa thanh toán"
      }
      footer={
        <>
          <Button2 size="sm" onClick={handleCancel}>
            Hủy
          </Button2>
          <Button2
            loading={loading}
            className="ml-2 text-white bg-main"
            size="sm"
            onClick={handleCreate}
          >
            Xác nhận
          </Button2>
        </>
      }
    >
      <Form form={form}>
        {type === DisputeResolveAction.PayPart && (
          <>
            <Radio.Group
              value={percentAmount}
              options={percentAmounts}
              onChange={(value) => handleChangePercentAmount(value)}
            ></Radio.Group>
            <MyFormItemInput
              disabled={percentAmount}
              form={form}
              name="amount"
              type="number"
              label="Số tiền"
            />
          </>
        )}
        <MyFormItemInput
          form={form}
          type="textarea"
          name="description"
          label="Lý do, ghi chú khi đưa ra quyết định"
        />
      </Form>
    </Modal>
  );
};

ResolveModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  type: PropTypes.number.isRequired,
  amountTotal: PropTypes.number,
};

export default ResolveModal;
