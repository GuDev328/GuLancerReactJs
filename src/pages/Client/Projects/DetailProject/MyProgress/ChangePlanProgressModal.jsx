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

export default function ChangePlanProgressModal({
  data,
  open,
  onCancel,
  onConfirm,
}) {
  const { id } = useParams();
  const [form] = useForm();
  const [numberOfMilestone, setNumberOfMilestone] = useState(1);
  useEffect(() => {
    form.setFieldsValue({
      ...data,
      milestone_info: data.milestone_info.map((item) => ({
        ...item,
        day_to_done: dayjs(item.day_to_done).format("YYYY-MM-DD"),
      })),
    });
    // form.setFieldsValue(data);
    setNumberOfMilestone(data.number_of_milestone);
    form.setFieldValue(
      "date_to_complete",
      dayjs(data.date_to_complete).format("YYYY-MM-DD")
    );
  }, [data, open]);
  const handleCancel = () => {
    onCancel();
    setTimeout(() => {
      form.resetFields();
    }, 200);
  };
  const handleConfirm = async () => {
    const val = await form.validateFields();

    const formatData = {
      ...val,
      project_id: id,
      salary: Number(val.salary),
      number_of_milestone: Number(val.number_of_milestone),
      milestone_info: val.milestone_info.map((item, i) => ({
        ...item,
        no: i + 1,
        salary: Number(item.salary),
      })),
    };
    const totalMilestoneSalary = formatData.milestone_info.reduce(
      (sum, item) => sum + item.salary,
      0
    );

    if (totalMilestoneSalary !== formatData.salary) {
      message.error("Tổng số tiền không khớp!");
      return;
    }
    const isDateSorted = formatData.milestone_info.every(
      (item, index, arr) =>
        index === 0 ||
        new Date(arr[index - 1].day_to_done) <= new Date(item.day_to_done)
    );

    if (!isDateSorted) {
      message.error("Các ngày dự kiến không đúng thứ tự!");
      return;
    }
    console.log(formatData);
    const res = await projectServices.editMyProgress(formatData);
    console.log(res);
    if (res.status === 200) {
      toast.success("Cập nhật thành công");
      onConfirm();
      form.resetFields();
    }
  };
  return (
    <MyModal
      title="Thay đổi thoả thuận dự án"
      open={open}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    >
      <Form form={form}>
        <div className="md:flex md:justify-between">
          <MyFormItemInput
            name="salary"
            isRequired
            label="Mức lương"
            form={form}
          />
          <MyFormItemInput
            name="date_to_complete"
            isRequired
            type="date"
            label="Ngày dự kiến hoàn thành "
            form={form}
          />
        </div>
        <div className="md:flex md:justify-between">
          <MyFormItemInput
            initialValue={1}
            name="number_of_milestone"
            isRequired
            onChange={(val) => setNumberOfMilestone(val)}
            label="Số lần thanh toán"
            form={form}
          />
        </div>

        {Array.from({
          length: numberOfMilestone,
        }).map((_, i) => (
          <div key={i} className="md:flex md:justify-between">
            <MyFormItemInput
              name={["milestone_info", i, "salary"]}
              isRequired
              label="Mức lương"
              form={form}
            />
            <MyFormItemInput
              name={["milestone_info", i, "day_to_done"]}
              isRequired
              type="date"
              label="Ngày dự kiến hoàn thành "
              form={form}
            />
          </div>
        ))}
      </Form>
    </MyModal>
  );
}

ChangePlanProgressModal.propTypes = {
  data: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
