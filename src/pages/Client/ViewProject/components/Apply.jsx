import { DatePicker, Form, Input, InputNumber, Modal } from "antd";
import React, { useState } from "react";
import PropTypes from "prop-types";
import MyModal from "@/components/core/MyModal";
import { Button as Button2 } from "@material-tailwind/react";
import MyDatePicker from "@/components/core/MyDatePicker";
import projectServices from "@/services/projectServices";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect } from "react";
import { message } from "antd";

const { TextArea } = Input;

const Apply = ({
  open,
  setOpen,
  projectId,
  applyId,
  isViewMode,
  refetchList,
}) => {
  const [salaryType, setSalaryType] = useState(applyId ? 1 : 0);
  const [timeType, setTimeType] = useState(applyId ? 1 : 0);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  // const salarySuggest = record?.salary === record.project.;
  // const timeSuggest = record?.time_to_complete;

  const { data: detailApplyInvite, refetch } = useQuery({
    queryKey: ["apply", applyId],
    queryFn: () => projectServices.getDetailApply(applyId),
    enabled: !!applyId,
  });

  useEffect(() => {
    if (applyId) {
      setSalaryType(1);
      setTimeType(1);
    }
    form.setFieldsValue({
      content: detailApplyInvite?.content,
      salary: detailApplyInvite?.salary,
      time_to_complete: detailApplyInvite?.time_to_complete
        ? dayjs(detailApplyInvite?.time_to_complete)
        : null,
    });
  }, [detailApplyInvite]);

  const handleConfirm = async () => {
    await form.validateFields();
    const dataForm = form.getFieldsValue();
    let res;
    if (applyId) {
      const dataUpdate = {
        apply_invite_id: applyId,
        content: dataForm.content,
        salary: dataForm.salary ? Number(dataForm.salary) : null,
        time_to_complete: dataForm.time_to_complete
          ? new Date(dataForm.time_to_complete).toISOString()
          : null,
      };
      res = await projectServices.editApplyProject(dataUpdate);
    } else {
      const dataCreate = {
        project_id: projectId,
        type: 0,
        content: dataForm.content,
        salary: dataForm.salary ? Number(dataForm.salary) : null,
        time_to_complete: dataForm.time_to_complete
          ? new Date(dataForm.time_to_complete).toISOString()
          : null,
      };
      res = await projectServices.applyProject(dataCreate);
    }
    if (res.status === 200) {
      message.success(applyId ? "Cập nhật thành công" : "Ứng tuyển thành công");
      form.resetFields();
      setOpen(false);
      refetchList();
      refetch();
    } else {
      message.error(applyId ? "Cập nhật thất bại" : "Ứng tuyển thất bại");
    }
  };

  return (
    <MyModal
      title="Ứng tuyển dự án"
      noFooter={isViewMode}
      open={open}
      width={"50%"}
      onConfirm={handleConfirm}
      onCancel={() => setOpen(false)}
      destroyOnClose
    >
      <Form
        labelAlign="left"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 20 }}
        form={form}
        disabled={isViewMode}
      >
        <Form.Item name={"content"} label="Lời chào">
          <TextArea
            autoSize={{ minRows: 6 }}
            placeholder="Nhập lời chào ứng tuyển"
          ></TextArea>
        </Form.Item>
        {!applyId && (
          <div className="flex gap-2 mb-2">
            <p>Mức lương:</p>
            <Button2
              onClick={() => setSalaryType(0)}
              className={salaryType === 0 ? "bg-blue-500" : "bg-gray-500"}
              size="sm"
              disabled={isViewMode}
            >
              Theo mô tả
            </Button2>
            <Button2
              className={salaryType === 1 ? "bg-blue-500" : "bg-gray-500"}
              size="sm"
              disabled={isViewMode}
              onClick={() => setSalaryType(1)}
            >
              Đề xuất
            </Button2>
          </div>
        )}
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
            label="Mức lương "
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Nhập mức lương đề xuất"
              suffix="VNĐ"
            ></InputNumber>
          </Form.Item>
        )}
        {!applyId && (
          <div className="flex gap-2 mb-2">
            <p>Thời gian hoàn thành:</p>
            <Button2
              onClick={() => setTimeType(0)}
              className={timeType === 0 ? "bg-blue-500" : "bg-gray-500"}
              size="sm"
              disabled={isViewMode}
            >
              Theo mô tả
            </Button2>
            <Button2
              className={timeType === 1 ? "bg-blue-500" : "bg-gray-500"}
              size="sm"
              disabled={isViewMode}
              onClick={() => setTimeType(1)}
            >
              Đề xuất
            </Button2>
          </div>
        )}
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
            label="Thời gian hoàn thành"
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
  applyId: PropTypes.string,
  isViewMode: PropTypes.bool,
  refetchList: PropTypes.func,
};

export default Apply;
