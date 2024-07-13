import React from "react";
import Job from "./Job";
import { useSelector } from "react-redux";
import { Pagination } from "antd";
import { Button, Chip, Input, Option, Select } from "@material-tailwind/react";
import FilterDrawer from "./FilterDrawer";

const Jobs = () => {
    const [openFilterDrawer, setOpenFilterDrawer] = React.useState(false);
    const isMobile = useSelector((state) => state.screen.isMobile);
    const onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
    };
    return (
        <div
            className="flex flex-col items-center justify-center"
            style={{ width: isMobile ? "100%" : "calc(100% - 300px)" }}
        >
            <div className="flex w-[90%]  justify-between mt-3">
                <div className="w-[250px]">
                    <Select className="bg-white " label="Sắp xếp theo">
                        <Option>Material Tailwind HTML</Option>
                        <Option>Material Tailwind React</Option>
                        <Option>Material Tailwind Vue</Option>
                        <Option>Material Tailwind Angular</Option>
                        <Option>Material Tailwind Svelte</Option>
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
            <div className="my-3  flex items-center flex-col">
                <Job />
                <Job />
                <Job />
                <Job />
            </div>

            <div className="w-full flex justify-center mb-3">
                <Pagination
                    showSizeChanger
                    onShowSizeChange={onShowSizeChange}
                    defaultCurrent={1}
                    total={500}
                />
            </div>
            <FilterDrawer
                open={openFilterDrawer}
                setOpen={setOpenFilterDrawer}
            />
        </div>
    );
};

export default Jobs;
