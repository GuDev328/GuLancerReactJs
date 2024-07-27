import React from "react";
import Freelancer from "./Freelancer";
import { useSelector } from "react-redux";
import { Pagination } from "antd";
import { Button, Chip, Input, Option, Select } from "@material-tailwind/react";
import FilterDrawer from "./FilterDrawer";

const Freelancers = () => {
    const [openFilterDrawer, setOpenFilterDrawer] = React.useState(false);
    const isMobile = useSelector((state) => state.screen.isMobile);
    const onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
    };
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex w-[100%]  justify-between ">
                <div className="w-[250px]">
                    <Select className="bg-white " label="Sắp xếp theo">
                        <Option>Theo lượt đánh giá cao nhất</Option>
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
            <div className="my-3 w-full flex items-center flex-col">
                <Freelancer />
                <Freelancer />
                <Freelancer />
                <Freelancer />
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

export default Freelancers;
