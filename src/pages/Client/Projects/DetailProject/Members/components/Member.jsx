import React, { useState } from "react";
import { Avatar, Rate, Tooltip } from "antd";
import PropTypes from "prop-types";
import { renderUserVerifyStatus } from "../../../../../../utils/render";
import EvaluateModal from "./EvaluateModal";

const Member = ({ member }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="relative inline-block items-center font-sans m-1 mx-5 p-3 rounded-xl bg-shadow ">
        <div className="flex">
          <Avatar src={member?.avatar} className="" size={45} />
          <div className="">
            <p className="ml-1 text-[18px] mt-2">{member?.name}</p>
            <div className="flex items-center">
              <p className="bg-[#ffb800] px-1 rounded-lg text-white">
                {member?.star.$numberDecimal}
              </p>
              <Rate
                allowHalf
                disabled
                defaultValue={Number(member?.star.$numberDecimal)}
              />
              <p className="ml-1 text-[13px] text-main">
                {member?.evaluationCount} đánh giá
              </p>
            </div>
            <p className="hidden sm:inline-block ml-1 text-[13px] text-main">
              Với {member?.projectsDone} dự án đã hoàn thành
            </p>
            {renderUserVerifyStatus(member?.verified_info.status)}
          </div>
        </div>
        <div
          className="absolute top-2 cursor-pointer right-2"
          onClick={() => setOpen(true)}
        >
          <Tooltip title="Viết đánh giá">
            <i className="text-[25px] fa-solid fa-comment-pen"></i>
          </Tooltip>
        </div>
      </div>
      <EvaluateModal
        member={member}
        open={open}
        onCancel={() => setOpen(false)}
        onSubmit={() => {}}
      />
    </div>
  );
};

Member.propTypes = {
  member: PropTypes.object.isRequired,
};

export default Member;
