import React, { useEffect } from "react";
import projectServices from "@/services/projectServices";
import { Divider, Form, Input, Select, Space } from "antd";
import MyButton from "@/components/core/MyButton";
import PropTypes from "prop-types";

const SelectFields = ({ required = true }) => {
  const [fieldsOptions, setFieldsOptions] = React.useState([]);
  const [newField, setNewField] = React.useState("");
  const fetchOptions = async () => {
    const fields = await projectServices.getAllFields();
    setFieldsOptions(
      fields.result.map((field) => ({
        label: field.name,
        value: field.name,
      }))
    );
  };
  useEffect(() => {
    fetchOptions();
  }, []);

  const handleAddField = () => {
    setFieldsOptions([...fieldsOptions, { label: newField, value: newField }]);
    setNewField("");
  };
  return (
    <Form.Item
      required={required}
      name="fields"
      rules={[
        {
          required: required,
          message: "Lĩnh lực không được để trống",
        },
      ]}
      label="Lĩnh vực"
    >
      <Select
        options={fieldsOptions}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider
              style={{
                margin: "8px 0",
              }}
            />
            <Space
              style={{
                padding: "0 8px 4px",
              }}
            >
              <Input
                maxLength={30}
                onChange={(e) => setNewField(e.target.value)}
                placeholder="--Nhập--"
              />
              <MyButton onClick={handleAddField} size="sm">
                Thêm lĩnh vực
              </MyButton>
            </Space>
          </>
        )}
        showSearch
        allowClear
        mode="multiple"
        placeholder="--Chọn--"
      />
    </Form.Item>
  );
};

SelectFields.propTypes = {
  required: PropTypes.bool,
};

export default SelectFields;
