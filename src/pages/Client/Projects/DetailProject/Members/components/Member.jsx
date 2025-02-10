import React from "react";
import { Avatar, Rate } from "antd";
import PropTypes from "prop-types";
import { UserVerifyStatus } from "../../../../../../constant/user";
import { render } from "less";
import { renderUserVerifyStatus } from "../../../../../../utils/render";

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
          <Avatar src={member?.avatar} className="" size={45} />
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
            {renderUserVerifyStatus(member?.verified_info.status)}
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
