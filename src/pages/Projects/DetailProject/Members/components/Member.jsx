import React from "react";
import { Avatar, Rate } from "antd";
import PropTypes from "prop-types";

const RoleMemberProject = {
    Leader: 1,
    Member: 0,
    Co_Admin: 2,
};

const Member = ({ member }) => {
    return (
        <div>
            <div className="inline-block items-center font-sans m-1 mx-5 p-3 rounded-xl bg-shadow ">
                <p>
                    {member.role === RoleMemberProject.Leader
                        ? "Trưởng nhóm"
                        : member.role === RoleMemberProject.Co_Admin
                        ? "Đồng quản lý"
                        : "Thành viên"}
                </p>
                <div className="flex">
                    <Avatar className="" size={45} />
                    <div className="">
                        <p className="ml-1 text-[18px] mt-2">{member.name}</p>
                        <div className="flex items-center">
                            <p className="bg-[#ffb800] px-1 rounded-lg text-white">
                                {member.star}
                            </p>
                            <Rate disabled defaultValue={2} />
                            <p className="ml-1 text-[13px] text-main">
                                {member.project_done} đánh giá
                            </p>
                        </div>
                        <p className=" hidden sm:inline-block ml-1 text-[13px] text-main">
                            Với {member.project_done} dự án đã hoàn thành
                        </p>
                        {member.verified && (
                            <p
                                className="text-[13px]"
                                style={{ color: "#31c740" }}
                            >
                                <i className="fa-light mr-1 fa-ballot-check"></i>
                                Đã xác thực
                            </p>
                        )}
                        {!member.verified && (
                            <p
                                className="text-[13px]"
                                style={{ color: "#c78631" }}
                            >
                                <i className="fa-light mr-1 fa-ballot-check"></i>
                                Chưa xác thực
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

Member.propTypes = {
    member: PropTypes.object.isRequired,
};

export default Member;
