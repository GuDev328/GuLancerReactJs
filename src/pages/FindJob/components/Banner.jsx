import React from "react";
import { Button, Chip, Input, Option, Select } from "@material-tailwind/react";
import ChartTopTech from "./ChartTopTech";
import PropTypes from "prop-types";

const Banner = ({ setDataSearch }) => {
    const [keySearch, setKeySearch] = React.useState("");
    const handleSearch = () => {
        setDataSearch((prev) => ({ ...prev, key: keySearch }));
    };
    return (
        <div className="flex h-[350px] justify-center  bg-gradient-to-r from-blue-300 to-cyan-300">
            <div className="w-[100%] lg:w-[50%]">
                <div className="text-white text-[27px] flex flex-col mt-14 items-center font-medium">
                    <p className="min-w-[75%] first-letter:text-[60px] leading-none">
                        Chào ngày mới,
                    </p>
                    <p className="min-w-[75%] leading-6 mb-3">
                        3424 dự án đang đợi bạn ...
                    </p>
                </div>

                <div className="flex  justify-center ">
                    <div className="min-w-[60%] !relative">
                        <input
                            value={keySearch}
                            onChange={(e) => setKeySearch(e.target.value)}
                            className=" border  min-w-[100%] h-12 pl-14 text-[12px] text-medium border-gray-300 rounded-md bg-white  "
                            placeholder="Tìm theo dự án, kỹ năng, ..."
                        />
                        <i className=" !absolute text-[25px] left-3 top-[11px] fa-regular text-main fa-magnifying-glass mr-2"></i>
                    </div>

                    <Button
                        color="blue"
                        buttonType="filled"
                        className=" w-[125px] ml-2 h-12 font-bold"
                        onClick={handleSearch}
                    >
                        Tìm kiếm
                    </Button>
                </div>
            </div>

            <div className="w-[50%] content-center hidden lg:block">
                <div className="w-[90%] text-white flex flex-col h-[300px] rounded-3xl bg-[#193C61]">
                    <div className="flex pt-3 pl-4">
                        <i className="text-[23px]  fa-duotone fa-magnifying-glass-waveform"></i>
                        <p className="font-bold text-[14px]">
                            Thị trường làm việc :
                        </p>
                    </div>

                    <div className="flex mb-3 justify-around text-[13px]">
                        <p></p>
                        <p></p>
                        <p>Dự án đang tuyển: </p>
                        <p>1234</p>
                        <div className="bg-white w-[2px] h-[20px]"></div>
                        <p>Dự án mới hôm nay:</p>
                        <p>132</p>
                        <p></p>
                        <p></p>
                    </div>
                    <div className="bg-white m-auto my-0 mb-3 w-[80%] h-[2px]"></div>

                    <div className="flex justify-between items-center mr-20">
                        <div className="flex text-[14px] pl-4">
                            <i className="text-[23px] fa-solid fa-chart-waterfall mr-2"></i>
                            <p>Nhu cầu tuyển dụng theo</p>
                        </div>
                        <div className="w-[200px] text-white ">
                            <Select
                                className="text-[14px] text-white font-sans"
                                variant="static"
                                value={0}
                            >
                                <Option value={0}>Theo công nghệ</Option>
                                <Option>Theo lĩnh vực</Option>
                            </Select>
                        </div>
                    </div>

                    <ChartTopTech />
                </div>
            </div>
        </div>
    );
};

Banner.propTypes = {
    setDataSearch: PropTypes.func.isRequired,
};

export default Banner;
