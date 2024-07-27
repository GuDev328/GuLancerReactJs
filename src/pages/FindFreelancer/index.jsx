import React from "react";
import Filter from "./components/Filter";
import { Button, Chip, Input, Option, Select } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import Freelancers from "./components/Freelancers";
function FindFreelancer(props) {
    const isMobile = useSelector((state) => state.screen.isMobile);
    return (
        <div className="flex justify-around">
            <Filter />
            <div
                className=""
                style={{ width: isMobile ? "95%" : "calc(95% - 294px)" }}
            >
                <div className="bg-main my-8 p-4 rounded-2xl w-[100%]">
                    <p className="font-semibold text-[20px] ml-10 mb-3 text-white">
                        Tìm Freelancer cho dự án của bạn
                    </p>
                    <div className="flex  justify-center ">
                        <div className="min-w-[80%] !relative">
                            <input
                                className=" border  min-w-[100%] h-12 pl-14 text-[12px] text-medium border-gray-300 rounded-md bg-white  "
                                placeholder="Tìm theo tên, username hoặc công nghệ, lĩnh vực"
                            />
                            <i className=" !absolute text-[25px] left-3 top-[11px] fa-regular text-main fa-magnifying-glass mr-2"></i>
                        </div>

                        <Button
                            color="blue"
                            buttonType="filled"
                            className=" w-[125px] ml-2 h-12 font-bold"
                        >
                            Tìm kiếm
                        </Button>
                    </div>
                </div>

                <Freelancers />
            </div>
        </div>
    );
}

export default FindFreelancer;
