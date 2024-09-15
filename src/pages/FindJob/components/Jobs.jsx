import React, { useEffect } from "react";
import Job from "./Job";
import { useSelector } from "react-redux";
import { Pagination } from "antd";
import { Button, Chip, Input, Option, Select } from "@material-tailwind/react";
import FilterDrawer from "./FilterDrawer";
import projectServices from "../../../services/projectServices";
import PropTypes from "prop-types";
1;
const orderByOptions = [
    { label: "Mới nhất", value: 0 },
    { label: "Theo mức lương", value: 1 },
    { label: "Theo số sao người tuyển dụng", value: 2 },
    { label: "Theo số dự án hoàn thành người tuyển dụng", value: 3 },
];

const Jobs = ({ pageData, pageInfo, setDataSearch }) => {
    const [openFilterDrawer, setOpenFilterDrawer] = React.useState(false);
    const isMobile = useSelector((state) => state.screen.isMobile);

    const onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
    };

    const handleChangeOrderBy = (value) => {
        setDataSearch((pre) => ({ ...pre, orderBy: value }));
    };

    const handlePageChange = (page, pageSize) => {
        setDataSearch((pre) => ({ ...pre, page: page, limit: pageSize }));
    };

    return (
        <div
            className="flex flex-col items-center"
            style={{ width: isMobile ? "100%" : "calc(100% - 300px)" }}
        >
            <div className="flex w-[90%]  justify-between mt-3">
                <div className="w-[280px]">
                    <Select
                        onChange={handleChangeOrderBy}
                        className="bg-white "
                        label="Sắp xếp theo"
                        value={0}
                    >
                        {orderByOptions.map((option) => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                </div>
                <Button
                    onClick={() => setOpenFilterDrawer(true)}
                    size="sm"
                    className="bg-main md:hidden"
                >
                    <i className="text-[18px] fa-regular fa-filter-list"></i>
                </Button>
            </div>
            <div className="my-3 w-full flex items-center justify-start flex-col">
                {pageData.map((job) => (
                    <Job key={job._id} data={job} />
                ))}
            </div>

            <div className="w-full flex justify-center mb-3">
                <Pagination
                    onChange={handlePageChange}
                    defaultCurrent={1}
                    total={pageInfo.total_page * pageInfo.limit}
                    pageSize={pageInfo.limit}
                />
            </div>
            <FilterDrawer
                open={openFilterDrawer}
                setOpen={setOpenFilterDrawer}
                setDataSearch={setDataSearch}
            />
        </div>
    );
};
Jobs.propTypes = {
    pageData: PropTypes.array.isRequired,
    pageInfo: PropTypes.object.isRequired,
    setDataSearch: PropTypes.func.isRequired,
};
export default Jobs;
