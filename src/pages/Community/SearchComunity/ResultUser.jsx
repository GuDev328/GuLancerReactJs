import React from "react";
import { Avatar, Rate } from "antd";
import { Button } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { GroupType, MemberStatus } from "../../../constant/group";
import { formatNumber } from "../../../utils/common";
import { useNavigate } from "react-router-dom";
import groupServices from "../../../services/groupServices";
import { UserRole } from "../../../constant/user";
import userServices from "../../../services/userServices";

const ResultUser = (props) => {
    const [following, setFollowing] = React.useState(false);
    const [data, setData] = React.useState(props.data);
    const handlerFollowUser = async (isFollowed, userId) => {
        if (following) return;

        setFollowing(true);

        try {
            if (isFollowed) {
                await userServices.unfollow(userId);
                setData({
                    ...data,
                    resultUser: data.resultUser.map((item) => {
                        if (item._id === userId) {
                            return { ...item, isFollowed: false };
                        } else return item;
                    }),
                });
            } else {
                await userServices.follow(userId);
                console.log("j", {
                    ...data,
                    resultUser: data.resultUser.map((item) => {
                        if (item._id === userId) {
                            return { ...item, isFollowed: true };
                        } else return item;
                    }),
                });
                setData({
                    ...data,
                    resultUser: data.resultUser.map((item) => {
                        if (item._id === userId) {
                            return { ...item, isFollowed: true };
                        } else return item;
                    }),
                });
            }
        } catch (error) {
            console.error("Có lỗi xảy ra:", error);
        } finally {
            setFollowing(false);
        }
    };

    const renderBtn = (isFollowed, userId) => {
        if (!isFollowed) {
            return (
                <Button
                    onClick={() => handlerFollowUser(isFollowed, userId)}
                    variant="outlined"
                    className="border-main mr-2"
                    size="sm"
                >
                    <i className="far text-main fa-heart"></i>
                </Button>
            );
        } else {
            return (
                <Button
                    onClick={() => handlerFollowUser(isFollowed, userId)}
                    variant="contained"
                    className="border-main text-white bg-main mr-2"
                    size="sm"
                >
                    <i className="fas fa-heart"></i>
                </Button>
            );
        }
    };

    return (
        <div className="flex gap-1 flex-wrap">
            {data.resultUser.map((item) => (
                <div
                    key={item._id}
                    className="w-[100%] lg:w-[49%] rounded-lg bg-[#f0f2f5] flex items-center justify-between"
                >
                    <div className=" cursor-pointer flex  mt-0 rounded-md  py-2  items-center">
                        <Avatar
                            src={item.avatar}
                            className="ml-5 mr-3 w-[70px] h-[70px]"
                            alt="avatar"
                            shape="square"
                        />
                        <div>
                            <p className="font-medium">
                                {item.name}{" "}
                                <span className="text-[12px] text-[#333]">
                                    @{item.username}
                                </span>
                            </p>
                            <p className="text-[13px]">
                                {item.role === UserRole.FREELANCER ? (
                                    <span>Freelancer</span>
                                ) : (
                                    <span>Employer</span>
                                )}
                            </p>
                            <div className="flex flex-wrap items-center">
                                <p className="bg-[#ffb800] px-1 rounded-lg text-white">
                                    4.9
                                </p>
                                <Rate disabled defaultValue={2} />
                                <p className="ml-1 text-[13px] text-main">
                                    120 đánh giá
                                </p>
                                <p className=" ml-1 text-[13px] text-main">
                                    Với 123 dự án đã hoàn thành
                                </p>
                            </div>
                        </div>
                    </div>
                    {renderBtn(item.isFollowed, item._id)}
                </div>
            ))}
            {data.resultUser.length === 0 && (
                <div className="text-center w-full mt-[20vh]">
                    Không có người dùng khớp với tìm kiếm
                </div>
            )}
        </div>
    );
};

ResultUser.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ResultUser;
