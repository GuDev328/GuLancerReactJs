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
