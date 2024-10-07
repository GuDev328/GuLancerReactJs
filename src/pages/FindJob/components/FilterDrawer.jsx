import React, { Fragment, useEffect, useState } from "react";
import { Drawer, Radio } from "antd";
import { Checkbox, Typography, Form, Input } from "antd";
import PropTypes from "prop-types";
import Filter from "./Filter";
import projectServices from "../../../services/projectServices";
import { Button } from "@material-tailwind/react";

const salaryType = [
    { label: "Trả lương theo giờ", value: 1 },
    { label: "Trả lương theo dự án", value: 0 },
    { label: "Tất cả", value: null },
];

const FilterDrawer = ({ open, setOpen, setDataSearch }) => {
    const [showMoreTech, setShowMoreTech] = useState(false);
    const [showMoreField, setShowMoreField] = useState(false);
    const [optionsFields, setOptionsFields] = useState([]);
    const [optionsTechs, setOptionsTechs] = useState([]);
    const [salaryFrom, setSalaryFrom] = useState(null);
    const [salaryTo, setSalaryTo] = useState(null);
    const fetchOptions = async () => {
        const resFields = await projectServices.getAllFields();
        const resTechs = await projectServices.getAllTechs();
        setOptionsFields(
            resFields.result.map((item) => ({
                label: item.name,
                value: item._id,
            }))
        );
        setOptionsTechs(
            resTechs.result.map((item) => ({
                label: item.name,
                value: item._id,
            }))
        );
    };
    useEffect(() => {
        fetchOptions();
    }, []);
    const handleShowMoreTech = () => {
        setShowMoreTech(!showMoreTech);
    };
    const handleShowMoreFiled = () => {
        setShowMoreField(!showMoreField);
    };
    const handleOnChangeFields = (list) => {
        setDataSearch((pre) => ({ ...pre, fields: list }));
    };
    const handleOnChangeTechs = (list) => {
        setDataSearch((pre) => ({ ...pre, technologies: list }));
    };
    const onChangeSalaryType = (e) => {
        setDataSearch((pre) => ({ ...pre, salaryType: e.target.value }));
    };
    const handleFilterSalary = () => {
        setDataSearch((pre) => ({
            ...pre,
            salaryFrom: salaryFrom ? Number(salaryFrom) : null,
            salaryTo: salaryTo ? Number(salaryTo) : null,
        }));
    };

    const closeDrawer = () => setOpen(false);
    return (
        <div>
            <Drawer title="Bộ Lọc" onClose={closeDrawer} open={open}>
                <div className="">
                    <div className="rounded-3xl bg-white  p-2">
                        <p className="text-[23px] font-bold">Kiểu dự án</p>
                        <div className="ml-3">
                            <Radio.Group
                                className="flex flex-col"
                                options={salaryType}
                                onChange={onChangeSalaryType}
                            ></Radio.Group>
                        </div>
                    </div>
                    <div className="rounded-3xl bg-white min-w-[230px] w-[15%]  p-2">
                        <p className="text-[23px] font-bold">Lĩnh vực</p>
                        <div className="ml-3">
                            <Checkbox.Group
                                options={optionsFields.slice(
                                    0,
                                    showMoreField ? optionsFields.length : 5
                                )}
                                className="flex flex-col"
                                onChange={handleOnChangeFields}
                            />
                            <a
                                onClick={handleShowMoreFiled}
                                className="text-[15px] mt-[8px] cursor-pointer"
                            >
                                {showMoreField ? "Thu gọn" : "Xem thêm"}
                            </a>
                        </div>
                    </div>

                    <div className="rounded-3xl bg-white min-w-[230px] w-[15%]  p-2">
                        <p className="text-[23px] font-bold">Công nghệ</p>
                        <div className="ml-3">
                            <Checkbox.Group
                                className="flex flex-col"
                                options={optionsTechs.slice(
                                    0,
                                    showMoreTech ? optionsTechs.length : 5
                                )}
                                onChange={handleOnChangeTechs}
                            />

                            <a
                                onClick={handleShowMoreTech}
                                type="link"
                                className="text-[15px] mt-[8px] cursor-pointer"
                            >
                                {showMoreTech ? "Thu gọn" : "Xem thêm"}
                            </a>
                        </div>
                    </div>
                    <div className="rounded-3xl bg-white min-w-[230px] w-[15%]  p-2">
                        <p className="text-[23px] font-bold">Mức lương</p>
                        <div className="ml-3">
                            <div className="flex items-center mb-2">
                                <p className=" block w-[38px]">Từ: </p>
                                <Input
                                    value={salaryFrom}
                                    onChange={(a) =>
                                        setSalaryFrom(a.target.value)
                                    }
                                />
                            </div>
                            <div className="flex items-center">
                                <p className="w-[38px] block">Đến: </p>
                                <Input
                                    value={salaryTo}
                                    onChange={(a) =>
                                        setSalaryTo(a.target.value)
                                    }
                                />
                            </div>
                            <div className="pb-6">
                                <Button
                                    onClick={handleFilterSalary}
                                    size="sm"
                                    className="bg-main float-right mt-1"
                                >
                                    Lọc
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

FilterDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    setDataSearch: PropTypes.func.isRequired,
};

export default FilterDrawer;
