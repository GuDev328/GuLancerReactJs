import { Form } from "antd";
import React from "react";
import PropTypes from "prop-types";
import MyFormItemInput from "../../../components/core/MyFormItemInput";
import { values } from "lodash";
import MyButton from "@/components/core/MyButton";
import { SearchOutlined } from "@ant-design/icons";

export default function Search({ setSearchValues }) {
  const [form] = Form.useForm();
  const handleSearch = () => {
    const values = form.getFieldsValue();
    setSearchValues(values);
  };
  return (
    <div className="flex gap-4">
      <Form form={form}>
        <div className="flex ">
          <MyFormItemInput
            name="key"
            label="Email, Username, Họ và tên"
            form={form}
          />
          <MyFormItemInput
            form={form}
            selectOptions={[
              { value: "", label: "Tất cả" },
              { value: 0, label: "Freelancer" },
              { value: 1, label: "Employer" },
              { value: 2, label: "Chưa xác nhận" },
              { value: 3, label: "Admin" },
            ]}
            type="select"
            name="role"
            label="Vai trò"
          />
          <MyFormItemInput
            form={form}
            selectOptions={[
              { value: 0, label: "Mặc định" },
              { value: 1, label: "Số sao" },
              { value: 2, label: "Số dự án đã hoàn thành" },
            ]}
            type="select"
            name="sortBy"
            label="Sắp xếp theo"
          />
        </div>
      </Form>
      <MyButton onClick={handleSearch} className="self-start" size="md">
        <SearchOutlined /> Tìm kiếm
      </MyButton>
    </div>
  );
}

Search.propTypes = {
  setSearchValues: PropTypes.func.isRequired,
};
