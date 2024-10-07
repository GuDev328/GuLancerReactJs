import { Button, Chip } from "@material-tailwind/react";
import { Avatar, Image, Rate } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import MarkdownView from "../../components/utils/MarkdownView";
import { useNavigate } from "react-router-dom";
const UserWall = () => {
    const { isMobile } = useSelector((state) => state.screen);
    const { userInfo } = useSelector((state) => state.user);
    const navigate = useNavigate();

    return (
        <div className="w-full h-full bg-white">
            <div className={`w-full relative `}>
                <Image
                    width={"100vw"}
                    height={"20vh"}
                    style={{ objectFit: "cover" }}
                    src="https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2023/07/anh-bia-dep-10.jpg.webp"
                />
                <div className="absolute flex items-center gap-3  bottom-[0] translate-y-1/2 left-[20px]">
                    <div className="bg-white rounded-[20px] p-3 ">
                        <Image
                            width={isMobile ? 120 : 200}
                            style={{ objectFit: "cover", borderRadius: "20px" }}
                            src={userInfo?.avatar}
                        />
                    </div>
                </div>
            </div>
            <div className={`${isMobile ? "ml-[175px]" : "ml-[255px]"}`}>
                <div className="flex flex-wrap text-xl font-bold ">
                    <p>{userInfo?.name}</p>

                    <span className="text-gray-600">
                        {" "}
                        @{userInfo?.username}
                    </span>
                </div>

                <p className="text-sm text-gray-500">
                    {userInfo?.role === 0 ? "Freelancer" : "Employer"}
                </p>

                {userInfo.verified && (
                    <p className="text-[18px]" style={{ color: "#31c740" }}>
                        <i className="fa-light mr-1 fa-ballot-check"></i>
                        Đã xác thực
                    </p>
                )}
                {!userInfo.verified && (
                    <p className="text-[18px]" style={{ color: "#c78631" }}>
                        <i className="fa-light mr-1 fa-ballot-check"></i>
                        Chưa xác thực
                    </p>
                )}
            </div>
            <div className="flex  flex-wrap ml-[20px] md:ml-[255px] flex-col md:flex-row-reverse justify-between">
                <div className="flex gap-x-2 justify-end items-center ">
                    <p className="text-[20px] font-bold">
                        <i className="fas mx-2 text-main fa-money-bill"></i>
                        200.000đ/Giờ
                    </p>

                    <Button variant="outlined" color={"blue"}>
                        <i className="fas fa-comment-alt-lines text-[18px]"></i>
                    </Button>
                    <Button className="bg-main mr-5 text-white">
                        <i className="far mr-2 text-[18px] fa-bullseye-pointer"></i>
                        Thuê ngay
                    </Button>
                </div>
                <div className="justify-start max-w-[650px] ">
                    <div
                        className={`flex flex-col md:flex-row flex-wrap gap-x-3 text-[17px] `}
                    >
                        <div className="flex  items-center gap-2">
                            <div className="text-xl font-bold">5.0</div>
                            <Rate value={5} />
                        </div>
                        <div className="flex  items-center gap-2">
                            <i className="fas fa-tasks-alt text-xl"></i>
                            <div>123 dự án đã hoàn thành</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="fas fa-comment-alt-lines text-xl"></i>
                            <div>123 đánh giá</div>
                        </div>
                    </div>
                    <div
                        className={`flex flex-col md:flex-row flex-wrap gap-x-3 text-[17px] `}
                    >
                        <div className="flex items-center gap-2">
                            <i className="fas fa-calendar-edit"></i>
                            <div>100% Đúng thời gian</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="fas fa-money-check-alt"></i>
                            <div>100% Đúng ngân sách</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="fas fa-vote-yea"></i>
                            <div> 100% Tỉ lệ chấp nhận dự án</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end mr-[20px]">
                <Button
                    onClick={() => navigate(`/edit-profile/${userInfo._id}`)}
                    variant="outlined"
                    size="sm"
                    color={"blue"}
                >
                    <i className="fad fa-edit text-[18px]"></i> Chỉnh sửa trang
                    cá nhân
                </Button>
            </div>
            <div className="ml-5 mt-2">
                <div className="flex flex-wrap">
                    <p className="font-bold m-1">Lĩnh vực công việc: </p>
                    {userInfo?.fields_info.map((field) => (
                        <Chip
                            key={field._id}
                            variant="ghost"
                            className="m-1"
                            value={field?.name}
                        />
                    ))}
                </div>
                <div className="flex flex-wrap">
                    <p className="font-bold m-1">Công nghệ sử dụng: </p>
                    {userInfo?.technologies_info.map((tech) => (
                        <Chip
                            key={tech._id}
                            variant="ghost"
                            className="m-1"
                            value={tech?.name}
                        />
                    ))}
                </div>
            </div>
            <MarkdownView data={userInfo?.description} />
        </div>
    );
};

export default UserWall;
