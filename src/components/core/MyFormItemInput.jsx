import { Form } from "antd";
import React from "react";
import PropTypes from "prop-types";
import { Button, Input, Select, Option } from "@material-tailwind/react";

export default function MyFormItemInput({
  rules,
  isRequired,
  name,
  label,
  form,
  type = "text",
  selectOptions = [],
}) {
  let rulesInput = rules ? rules : [];
  if (isRequired) {
    rulesInput.push({ required: true, message: `Vui lòng nhập ${label}` });
  }
  if (type === "text")
    return (
      <Form.Item rules={rulesInput} label=" " colon={false} name={name}>
        <Input
          label={label}
          className="bg-white"
          type="text"
          onChange={(e) => form.setFieldValue(name, e.target.value)}
        />
      </Form.Item>
    );

  if (type === "date")
    return (
      <Form.Item rules={rulesInput} label=" " colon={false} name={name}>
        <Input
          className="bg-white"
          label={label}
          type="date"
          onChange={(e) => form.setFieldValue(name, e.target.value)}
        />
      </Form.Item>
    );

  if (type === "select")
    return (
      <Form.Item rules={rulesInput} label=" " colon={false} name={name}>
        <Select
          className="bg-white"
          label={label}
          onChange={(val) => form.setFieldValue(val)}
        >
          {selectOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
    );
}

MyFormItemInput.propTypes = {
  rules: PropTypes.array,
  isRequired: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  selectOptions: PropTypes.array,
};
