import React from "react";
import { Avatar } from "antd";
import { Button } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { GroupType, MemberStatus } from "../../../constant/group";
import { formatNumber } from "../../../utils/common";
import { useNavigate } from "react-router-dom";
import groupServices from "../../../services/groupServices";

const ResultGroup = ({ data }) => {
    const navigateTo = useNavigate();
    const [render, reRender] = React.useState(false);

    const handleJoinGroup = async (group_id, group_type) => {
        await groupServices.joinGroup(group_id);
        if (group_type === GroupType.PUBLIC) {
            data.resultGroup = data.resultGroup.map((item) => {
                if (item._id === group_id)
                    return { ...item, statusMember: MemberStatus.ACCEPTED };
                else return item;
            });
        } else {
            data.resultGroup = data.resultGroup.map((item) => {
                if (item._id === group_id)
                    return { ...item, statusMember: MemberStatus.WAITING };
                else return item;
            });
        }
        reRender(!render);
    };

    const renderBtn = (statusMember, group_id, group_type) => {
        if (statusMember === MemberStatus.WAITING)
            return (
                <Button className="" variant="outlined" size="sm">
                    Đang xét duyệt
                </Button>
            );
        else if (statusMember === MemberStatus.ACCEPTED)
            return (
                <Button
                    onClick={() => navigateTo(`/community/${group_id}`)}
                    className="bg-[#808183] text-black"
                    size="sm"
                >
                    Truy cập
                </Button>
            );
        else
            return (
                <Button
                    onClick={() => handleJoinGroup(group_id, group_type)}
                    className="bg-main"
                    size="sm"
                >
                    Tham gia
                </Button>
            );
    };

    return (
        <div className="flex gap-1 flex-wrap">
            {data.resultGroup.map((item) => (
                <div
                    key={item._id}
                    className="w-[100%] lg:w-[49%] rounded-lg bg-[#f0f2f5] flex items-center justify-between"
                >
                    <div className=" cursor-pointer flex  mt-0 rounded-md  py-2  items-center">
                        <Avatar
                            src={item.cover_photo}
                            className="ml-5 mr-3 w-[70px] h-[70px]"
                            alt="avatar"
                            shape="square"
                        />
                        <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-[13px]">
                                {item.type === GroupType.PUBLIC ? (
                                    <span>
                                        <i className="fad fa-globe-asia"></i>{" "}
                                        Nhóm công khai
                                    </span>
                                ) : (
                                    <span>
                                        <i className="fad fa-lock-alt"></i> Nhóm
                                        riêng tư
                                    </span>
                                )}
                                <span className="ml-2">
                                    <i className="fad fa-users"></i>{" "}
                                    {formatNumber(item.member_count)} thành viên
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="mr-3">
                        {renderBtn(item.statusMember, item._id, item.type)}
                    </div>
                </div>
            ))}
            {data.resultGroup.length === 0 && (
                <div className="text-center w-full mt-[20vh]">
                    Không có cộng đồng khớp với tìm kiếm
                </div>
            )}
        </div>
    );
};

ResultGroup.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ResultGroup;
