import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import { Checkbox, Input } from "antd";
import PropTypes from "prop-types";
import projectServices from "@/services/projectServices";
import MyButton from "./../../../../components/core/MyButton";
import { Radio } from "antd";
import { UserVerifyStatus } from "../../../../constant/user";

const FilterDrawer = ({ open, setOpen, setDataSearch, dataSearch }) => {
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
  const handleOnChangeFields = (list) => {
    setDataSearch((pre) => ({ ...pre, fields: list }));
  };
  const handleOnChangeTechs = (list) => {
    setDataSearch((pre) => ({ ...pre, technologies: list }));
  };

  const handleFilterSalary = () => {
    setDataSearch((pre) => ({
      ...pre,
      salaryFrom: salaryFrom ? Number(salaryFrom) : null,
      salaryTo: salaryTo ? Number(salaryTo) : null,
    }));
  };
  const handleShowMoreTech = () => {
    setShowMoreTech(!showMoreTech);
  };
  const handleShowMoreFiled = () => {
    setShowMoreField(!showMoreField);
  };
  const handleOnChangeVerified = (e) => {
    setDataSearch((pre) => ({ ...pre, verified: e.target.value }));
  };
  const closeDrawer = () => setOpen(false);
  return (
    <div>
      <Drawer title="Bộ Lọc" onClose={closeDrawer} open={open}>
        <div className="hidden md:block   w-[230px]">
          <div className="rounded-3xl bg-white min-w-[230px] w-[15%]  ">
            <p className="text-[23px] font-bold">Xác thực</p>
            <Radio.Group
              value={dataSearch.verified}
              options={[
                { label: "Tất cả", value: undefined },
                { label: "Đã xác thực", value: UserVerifyStatus.Approved },
                { label: "Chưa xác thực", value: UserVerifyStatus.Unverified },
              ]}
              className="flex flex-col"
              onChange={handleOnChangeVerified}
            />
          </div>

          <div className="rounded-3xl bg-white min-w-[230px] w-[15%] ">
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

          <div className="rounded-3xl bg-white min-w-[230px] w-[15%] ">
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
          <div className="rounded-3xl bg-white min-w-[230px] w-[15%] ">
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
                <MyButton
                  onClick={handleFilterSalary}
                  size="sm"
                  className="bg-main float-right mt-1"
                >
                  Lọc
                </MyButton>
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
  dataSearch: PropTypes.any.isRequired,
};

export default FilterDrawer;
