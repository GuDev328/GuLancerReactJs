import { DatePicker, Form, Input, InputNumber, Modal } from "antd";
import React, { useState } from "react";
import PropTypes from "prop-types";
import MyModal from "@/components/core/MyModal";
import { Button as Button2 } from "@material-tailwind/react";
import MyDatePicker from "@/components/core/MyDatePicker";
import projectServices from "@/services/projectServices";
import { toast } from "react-toastify";

const { TextArea } = Input;

const Apply = ({ open, setOpen, projectId }) => {
  const [salaryType, setSalaryType] = useState(0);
  const [timeType, setTimeType] = useState(0);
  const [form] = Form.useForm();

  const handleConfirm = async () => {
    await form.validateFields();
    const dataForm = form.getFieldsValue();
    const data = {
      project_id: projectId,
      type: 0,
      content: dataForm.content,
      salary: dataForm.salary ? Number(dataForm.salary) : null,
      time_to_complete: dataForm.time_to_complete
        ? new Date(dataForm.time_to_complete).toISOString()
        : null,
    };
    const res = await projectServices.applyProject(data);
    if (res.status === 200) {
      toast.success("Ứng tuyển thành công");
      form.resetFields();
      setOpen(false);
    } else {
      toast.error("Ứng tuyển thất bại");
    }
  };
  return (
    <MyModal
      title="Ứng tuyển dự án"
      open={open}
      onConfirm={handleConfirm}
      onCancel={() => setOpen(false)}
    >
      <Form form={form}>
        <Form.Item initialValue={""} name={"content"} label="Lời chào">
          <TextArea
            autoSize={{ minRows: 6 }}
            placeholder="Nhập lời chào ứng tuyển"
          ></TextArea>
        </Form.Item>
        <div className="flex gap-2 mb-2">
          <p>Mức lương:</p>
          <Button2
            onClick={() => setSalaryType(0)}
            className={salaryType === 0 ? "bg-blue-500" : "bg-gray-500"}
            size="sm"
          >
            Theo mô tả
          </Button2>
          <Button2
            className={salaryType === 1 ? "bg-blue-500" : "bg-gray-500"}
            size="sm"
            onClick={() => setSalaryType(1)}
          >
            Đề xuất
          </Button2>
        </div>
        {salaryType === 1 && (
          <Form.Item
            required
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mức lương đề xuất",
              },
            ]}
            name={"salary"}
            label="Mức lương đề xuất"
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Nhập mức lương đề xuất"
            ></InputNumber>
          </Form.Item>
        )}
        <div className="flex gap-2 mb-2">
          <p>Thời gian hoàn thành:</p>
          <Button2
            onClick={() => setTimeType(0)}
            className={timeType === 0 ? "bg-blue-500" : "bg-gray-500"}
            size="sm"
          >
            Theo mô tả
          </Button2>
          <Button2
            className={timeType === 1 ? "bg-blue-500" : "bg-gray-500"}
            size="sm"
            onClick={() => setTimeType(1)}
          >
            Đề xuất
          </Button2>
        </div>
        {timeType === 1 && (
          <Form.Item
            required
            rules={[
              {
                required: true,
                message: "Vui lòng nhập thời gian hoàn thành đề xuất",
              },
            ]}
            name={"time_to_complete"}
            label="Thời gian hoàn thành đề xuất"
          >
            <MyDatePicker></MyDatePicker>
          </Form.Item>
        )}
      </Form>
    </MyModal>
  );
};

Apply.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  projectId: PropTypes.string,
};

export default Apply;
