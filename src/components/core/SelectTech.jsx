import React, { useEffect } from "react";
import projectServices from "../../services/projectServices";
import { Divider, Form, Input, Select, Space } from "antd";
import MyButton from "./MyButton";
import PropTypes from "prop-types";

const SelectTech = ({ required = true }) => {
    const [techsOptions, setTechsOptions] = React.useState([]);
    const [newTech, setNewTech] = React.useState("");
    const fetchOptions = async () => {
        const techs = await projectServices.getAllTechs();
        setTechsOptions(
            techs.result.map((field) => ({
                label: field.name,
                value: field.name,
            }))
        );
    };
    useEffect(() => {
        fetchOptions();
    }, []);

    const handleAddTech = () => {
        setTechsOptions([...techsOptions, { label: newTech, value: newTech }]);
        setNewTech("");
    };

    return (
        <Form.Item
            required={required}
            name="technologies"
            rules={[
                {
                    required: required,
                    message: "Công nghệ không được để trống",
                },
            ]}
            label="Công nghệ sử dụng"
        >
            <Select
                options={techsOptions}
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
                                onChange={(e) => setNewTech(e.target.value)}
                                value={newTech}
                                maxLength={30}
                                placeholder="--Nhập--"
                            />
                            <MyButton onClick={handleAddTech} size="sm">
                                Thêm Công nghệ
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

SelectTech.propTypes = {
    required: PropTypes.bool,
};

export default SelectTech;
