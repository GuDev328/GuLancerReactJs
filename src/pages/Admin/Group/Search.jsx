import { Form } from "antd";
import React from "react";
import PropTypes from "prop-types";
import MyFormItemInput from "../../../components/core/MyFormItemInput";
import MyButton from "@/components/core/MyButton";
import { SearchOutlined } from "@ant-design/icons";

export default function Search({ setSearchValues }) {
  const [form] = Form.useForm();

  const handleSearch = () => {
    const values = form.getFieldsValue();
    console.log(values);
    setSearchValues(values);
  };

  return (
    <div className="flex gap-4">
      <Form form={form}>
        <div className="flex">
          <MyFormItemInput name="search_key" label="Tên nhóm" form={form} />
          <MyFormItemInput
            form={form}
            initialValue={"created_at"}
            selectOptions={[
              { value: "members_count", label: "Số thành viên" },
              { value: "posts_count", label: "Số bài viết" },
              { value: "created_at", label: "Ngày tạo" },
            ]}
            type="select"
            name="sort_by"
            label="Sắp xếp theo"
          />
          <MyFormItemInput
            form={form}
            initialValue={"desc"}
            selectOptions={[
              { value: "asc", label: "Tăng dần" },
              { value: "desc", label: "Giảm dần" },
            ]}
            type="select"
            name="order_by"
            label="Thứ tự"
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
