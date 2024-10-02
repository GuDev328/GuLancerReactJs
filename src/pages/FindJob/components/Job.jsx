import { Avatar, Button } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { formatCurrency } from "../../../utils/common";
import MDEditor from "@uiw/react-md-editor";
import { useNavigate } from "react-router-dom";

const Job = ({ data }) => {
    const isMobile = useSelector((state) => state.screen.isMobile);
    const navigate = useNavigate();
    return (
        <div className="relative mb-2 bg-white w-[90%] rounded-3xl p-5">
            <div className="flex justify-between items-start">
                <div className=" sm:flex items-end">
                    <p className="text-main font-bold text-[20px] ">
                        {data?.title}
                    </p>
                    <p className="hidden sm:inline-block text-gray-500 ml-2 mb-1 text-[14px]">
                        Hạn ứng tuyển: 10/09/2022
                    </p>
                </div>
                <div className="flex flex-col ml-10 items-end leading-none">
                    <div className="text-main font-bold text-[20px]">
                        {formatCurrency(data?.salary)}
                    </div>
                    <div className="text-gray-500    text-[14px]">
                        {data?.salaryType === 0
                            ? "Trả theo dự án"
                            : "Trả theo giờ"}
                    </div>
                </div>
            </div>
            <div className="text-[15px] ">
                <div className="flex ">
                    <div className=" ml-4 w-[60%] min-w-[300px]">
                        <p>
                            Lĩnh vực:{" "}
                            <span className="text-main">
                                {data?.fields_info
                                    .map((field) => field.name)
                                    .join(", ")}
                            </span>
                        </p>
                        <p>
                            Công nghệ yêu cầu:{" "}
                            <span className="text-main">
                                {data?.technologies_info
                                    .map((tech) => tech.name)
                                    .join(", ")}
                            </span>
                        </p>
                        <p>Cần tìm 2 Freelancer</p>
                    </div>
                    <div className="hidden  w-full max-h-[85px] overflow-hidden lg:block text-ellipsis">
                        <MDEditor
                            className="custom-preview"
                            hideToolbar={true}
                            value={data?.description}
                            preview="preview"
                        ></MDEditor>
                    </div>
                </div>

                <div className="hidden sm:block">
                    <div className="flex items-center ">
                        <Avatar
                            className="bg-main"
                            src={data?.user[0]?.avatar}
                        />
                        <div className=" leading-none ml-1 mt-[13px]">
                            <div className=" flex items-end">
                                <p className="mr-1">{data?.user[0]?.name}</p>
                                <i
                                    className=" fa-solid fa-star"
                                    style={{ color: "#FFB800" }}
                                ></i>
                                <p>{data?.user[0]?.star}/5.0</p>
                                <p className=" hidden sm:inline-block ml-1 text-[13px] text-gray-500">
                                    Với {data?.user[0]?.project_done} dự án đã
                                    hoàn thành
                                </p>
                            </div>
                            <p
                                className="text-[13px]"
                                style={{ color: "#31c740" }}
                            >
                                <i className="fa-light mr-1 fa-ballot-check"></i>
                                Đã xác thực
                            </p>
                        </div>
                    </div>
                    <div className=""></div>
                </div>
            </div>
            <div className="absolute bottom-3 right-5 ">
                <Button
                    onClick={() => navigate(`/project/${data?._id}`)}
                    size={isMobile ? "sm" : "md"}
                    className="bg-main"
                >
                    Xem chi tiêt
                </Button>
            </div>
        </div>
    );
};
Job.propTypes = {
    data: PropTypes.object.isRequired,
};
export default Job;
