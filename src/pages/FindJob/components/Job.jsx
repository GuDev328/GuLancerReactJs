import { Avatar, Button } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";

const Job = () => {
    const isMobile = useSelector((state) => state.screen.isMobile);
    return (
        <div className="relative mb-2 bg-white w-[90%] rounded-3xl p-5">
            <div className="flex justify-between items-start">
                <div className=" sm:flex items-end">
                    <p className="text-main font-bold text-[20px] ">
                        Xây dựng Website bán bán quy
                    </p>
                    <p className="hidden sm:inline-block text-gray-500 ml-2 mb-1 text-[14px]">
                        Hạn ứng tuyển: 10/09/2022
                    </p>
                </div>
                <div className="flex flex-col ml-10 items-end leading-none">
                    <div className="text-main font-bold text-[20px]">
                        20,000,000đ
                    </div>
                    <div className="text-gray-500    text-[14px]">
                        Trả theo dự án
                    </div>
                </div>
            </div>
            <div className="text-[15px] ">
                <div className="flex ">
                    <div className=" ml-4 w-[100%] min-w-[300px]">
                        <p>Lĩnh vực: Xây dựng website</p>
                        <p>
                            Công nghệ yêu cầu: HTML, CSS, JavaScript, ReactJS,
                            MongoDB, SEO
                        </p>
                        <p>Cần tìm 2 Freelancer</p>
                    </div>
                    <div className="hidden max-h-[85px] overflow-hidden lg:block text-ellipsis">
                        Im looking for a skilled web developer to re-build my
                        existing online shop, www.filtrex.ro. Your primary
                        aesthetics. Im looking for a skilled web developer to
                        re-product categorization and product page Im looking
                        for a skilled web developer to re-build my existing
                        online shop, www.filtrex.ro. Your primary aesthetics. Im
                        looking for a skilled web developer to re-product
                        categorization and product page
                    </div>
                </div>

                <div className="hidden sm:block">
                    <div className="flex items-center ">
                        <Avatar className="bg-black" />
                        <div className=" leading-none ml-1 mt-[13px]">
                            <div className=" flex items-end">
                                <p className="mr-1">Phạm Tiến Đạt</p>
                                <i
                                    className=" fa-solid fa-star"
                                    style={{ color: "#FFB800" }}
                                ></i>
                                <p>4.9/5.0</p>
                                <p className=" hidden sm:inline-block ml-1 text-[13px] text-gray-500">
                                    Với 123 dự án đã hoàn thành
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
                <Button size={isMobile ? "sm" : "md"} className="bg-main">
                    Xem chi tiêt
                </Button>
            </div>
        </div>
    );
};

export default Job;
