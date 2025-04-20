import React, { useEffect, useState } from "react";
import { Checkbox, Typography, Form, Input, Radio } from "antd";
import projectServices from "@/services/projectServices";
import PropTypes from "prop-types";
import { Button } from "@material-tailwind/react";

const salaryType = [
  { label: "Trả lương theo giờ", value: 1 },
  { label: "Trả lương theo dự án", value: 0 },
  { label: "Tất cả", value: null },
];
const Filter = ({ setDataSearch, dataSearch }) => {
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

  return (
    <div className="hidden md:block my-5 mx-8 w-[230px]">
      <div className="rounded-3xl bg-white min-w-[230px] w-[15%] my-3 p-5">
        <p className="text-[23px] font-bold">Kiểu dự án</p>
        <div className="ml-3">
          <Radio.Group
            value={dataSearch.salaryType}
            options={salaryType}
            onChange={onChangeSalaryType}
          ></Radio.Group>
        </div>
      </div>
      <div className="rounded-3xl bg-white min-w-[230px] w-[15%] my-3 p-5">
        <p className="text-[23px] font-bold">Lĩnh vực</p>
        <div className="ml-3">
          <Checkbox.Group
            value={dataSearch.fields}
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

      <div className="rounded-3xl bg-white min-w-[230px] w-[15%] my-3 p-5">
        <p className="text-[23px] font-bold">Công nghệ</p>
        <div className="ml-3">
          <Checkbox.Group
            value={dataSearch.technologies}
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
      <div className="rounded-3xl bg-white min-w-[230px] w-[15%] my-3 p-5">
        <p className="text-[23px] font-bold">Mức lương</p>
        <div className="ml-3 text-[14px]">
          <div className="flex items-center mb-2 ">
            <p className=" block w-[38px]">Từ: </p>
            <Input
              value={salaryFrom || dataSearch.salaryFrom}
              onChange={(a) => setSalaryFrom(a.target.value)}
            />
          </div>
          <div className="flex items-center">
            <p className="w-[38px] block">Đến: </p>
            <Input
              value={salaryTo || dataSearch.salaryTo}
              onChange={(a) => setSalaryTo(a.target.value)}
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
  );
};

Filter.propTypes = {
  setDataSearch: PropTypes.func.isRequired,
  dataSearch: PropTypes.object.isRequired,
};

export default Filter;
