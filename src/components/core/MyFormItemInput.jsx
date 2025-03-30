import { Form } from "antd";
import React from "react";
import PropTypes from "prop-types";
import { Button, Input, Select, Option } from "@material-tailwind/react";
import { Checkbox } from "antd";
import { Textarea } from "@material-tailwind/react";

export default function MyFormItemInput({
  onChange,
  rules,
  isRequired = false,
  name,
  label,
  disabled = false,
  form,
  type = "text",
  selectOptions = [],
  ...rest
}) {
  let rulesInput = rules ? rules : [];
  if (isRequired) {
    rulesInput.push({ required: true, message: `Vui lòng nhập ${label}` });
  }
  if (type === "text")
    return (
      <Form.Item
        rules={rulesInput}
        label=" "
        colon={false}
        name={name}
        {...rest}
      >
        <Input
          label={label}
          className="bg-white"
          type="text"
          disabled={disabled}
          onChange={(e) => {
            form.setFieldValue(name, e.target.value);
            onChange && onChange(e.target.value);
          }}
        />
      </Form.Item>
    );

  if (type === "number")
    return (
      <Form.Item
        rules={rulesInput}
        label=" "
        colon={false}
        name={name}
        {...rest}
      >
        <Input
          label={label}
          className="bg-white"
          type="text"
          disabled={disabled}
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            form.setFieldValue(name, e.target.value);
            onChange && onChange(e.target.value);
          }}
        />
      </Form.Item>
    );

  if (type === "date")
    return (
      <Form.Item
        rules={rulesInput}
        label=" "
        colon={false}
        name={name}
        {...rest}
      >
        <Input
          className="bg-white"
          label={label}
          type="date"
          disabled={disabled}
          onChange={(e) => {
            console.log(e.target.value);
            form.setFieldValue(name, e.target.value);
            onChange && onChange(e.target.value);
          }}
        />
      </Form.Item>
    );

  if (type === "select")
    return (
      <Form.Item
        rules={rulesInput}
        label=" "
        colon={false}
        name={name}
        {...rest}
      >
        <Select
          className="bg-white"
          label={label}
          onChange={(val) => {
            form.setFieldValue(name, val);
            onChange && onChange(val);
          }}
        >
          {selectOptions.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
    );

  if (type === "checkbox")
    return (
      <Form.Item
        rules={rulesInput}
        label=" "
        colon={false}
        valuePropName="checked"
        name={name}
        {...rest}
      >
        <Checkbox
          onChange={(e) => {
            form.setFieldValue(name, e.target.checked);
            onChange && onChange(e.target.checked);
          }}
        >
          {label}
        </Checkbox>
      </Form.Item>
    );

  if (type === "textarea")
    return (
      <Form.Item
        rules={rulesInput}
        label=" "
        colon={false}
        name={name}
        {...rest}
      >
        <Textarea
          label={label}
          className="bg-white"
          rows={4}
          autoCapitalize="on"
          onChange={(e) => {
            form.setFieldValue(name, e.target.value);
            onChange && onChange(e.target.value);
          }}
        />
      </Form.Item>
    );
}

MyFormItemInput.propTypes = {
  onChange: PropTypes.func,
  rules: PropTypes.array,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  selectOptions: PropTypes.array,
};
