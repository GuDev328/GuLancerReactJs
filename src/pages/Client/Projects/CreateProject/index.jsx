import { Col, Divider, Form, Input, message, Row, Select, Space } from "antd";
import React, { useEffect } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { Button } from "@material-tailwind/react";
import MyButton from "@/components/core/MyButton";
import projectServices from "@/services/projectServices";
import { useNavigate } from "react-router-dom";
import SelectFields from "@/components/business/select/SelectFields";
import SelectTech from "@/components/business/select/SelectTech";
import MyDatePicker from "@/components/core/MyDatePicker";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
const CreateProject = () => {
  const { id } = useParams();
  const [description, setDescription] = React.useState("");
  const [form] = Form.useForm();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        const res = await projectServices.getDetailProject(id);
        console.log(res.result[0]);
        if (res) {
          form.setFieldsValue({
            title: res.result[0].title,
            description: res.result[0].description,
            salaryType: res.result[0].salaryType,
            startDate: res.result[0].start_date
              ? dayjs(res.result[0].start_date)
              : null,
            endDate: res.result[0].end_date
              ? dayjs(res.result[0].end_date)
              : null,
            fields: res.result[0].field_info.map((item) => item.name),
            technologies: res.result[0].tech_info.map((item) => item.name),
          });
        }
      };
      fetchProject();
    }
  }, [id]);

  const handleSubmit = async () => {
    await form.validateFields();
    const data = await form.getFieldsValue();
    if (!id) {
      const res = await projectServices.createProject(data);
      if (res.status === 200) {
        message.success("Tạo dự án thành công!");
        navigateTo("/projects");
        await form.resetFields();
      }
    } else {
      const formatData = {
        project_id: id,
        title: data.title,
        description: data.description,
        salaryType: data.salaryType,
        startDate: data.startDate,
        endDate: data.endDate,
        fields: data.fields,
        technologies: data.technologies,
      };
      const res = await projectServices.updateProject(formatData);
      if (res.status === 200) {
        message.success("Cập nhật dự án thành công!");
        navigateTo("/projects/detail/" + id);
        await form.resetFields();
      }
    }
  };

  const projectTypesOptions = [
    {
      label: "Trả theo dự án",
      value: 0,
    },
    {
      label: "Trả theo giờ",
      value: 1,
    },
  ];

  return (
    <div className="bg-white mx-10 rounded-xl px-5 py-3 my-5">
      <p className="font-bold text-[20px] mb-3">
        {id ? "Chỉnh sửa dự án" : "Tạo dự án mới"}
      </p>
      <Form
        form={form}
        labelAlign="left"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 20 }}
      >
        <Form.Item
          name={"title"}
          label="Tên dự án"
          rules={[
            {
              required: true,
              message: "Tên dự án không được để trống",
            },
          ]}
        >
          <Input placeholder="--Nhập--" />
        </Form.Item>
        <SelectFields />
        <SelectTech />
        <Row gutter={10}>
          <Col span={24}>
            <Form.Item
              initialValue={0}
              name="salaryType"
              label="Loại dự án"
              required
            >
              <Select
                disabled
                options={projectTypesOptions}
                placeholder="--Chọn--"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={10}>
          <Col span={24}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Ngày bắt đầu không được để trống",
                },
              ]}
              name="startDate"
              label="Dự kiến bắt đầu"
              required
            >
              <MyDatePicker />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Ngày kết thúc không được để trống",
                },
              ]}
              name="endDate"
              label="Ngày dự kiến bắt đầu"
              required
            >
              <MyDatePicker />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Mô tả dự án">
          <Input className="hidden"></Input>
        </Form.Item>
        <Form.Item wrapperCol={24} name="description" valuePropName="value">
          <MarkdownEditor
            value={description}
            minHeight="300px"
            onChange={(value) => setDescription(value)}
          />
        </Form.Item>
      </Form>
      <div className="flex justify-end">
        <Button className="bg-main" onClick={handleSubmit}>
          Xác nhận
        </Button>
      </div>
    </div>
  );
};

export default CreateProject;
