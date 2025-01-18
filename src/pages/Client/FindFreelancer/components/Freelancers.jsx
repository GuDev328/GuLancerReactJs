import React from "react";
import Freelancer from "./Freelancer.jsx";
import { useSelector } from "react-redux";
import { Pagination } from "antd";
import { Button, Chip, Input, Option, Select } from "@material-tailwind/react";
import FilterDrawer from "./FilterDrawer.jsx";
import PropTypes from "prop-types";

const orderByOptions = [
    { label: "Theo số dự án hoàn thành", value: 0 },
    { label: "Theo mức lương", value: 1 },
    { label: "Theo số sao", value: 2 },
];

const Freelancers = ({ pageData, pageInfo, setDataSearch, setPageInfo }) => {
    const [openFilterDrawer, setOpenFilterDrawer] = React.useState(false);
    const isMobile = useSelector((state) => state.screen.isMobile);
    const onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
    };
    const handleChangeOrderBy = (value) => {
        setDataSearch((pre) => ({ ...pre, orderBy: value }));
    };

    const handlePageChange = (page, pageSize) => {
        setDataSearch((pre) => ({ ...pre, page: page }));
    };
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex w-[100%]  justify-between ">
                <div className="w-[250px]">
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
                    className="bg-main"
                >
                    <i className="text-[18px] fa-regular fa-filter-list"></i>
                </Button>
            </div>
            <div className="my-3 w-full flex items-center flex-col">
                {pageData.map((freelancer) => (
                    <Freelancer key={freelancer._id} data={freelancer} />
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
            />
        </div>
    );
};

Freelancers.propTypes = {
    pageData: PropTypes.array,
    pageInfo: PropTypes.object,
    setDataSearch: PropTypes.func,
    setPageInfo: PropTypes.func,
};

export default Freelancers;
