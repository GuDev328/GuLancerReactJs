import React, { useState } from "react";
import { Avatar, Rate, Tooltip } from "antd";
import PropTypes from "prop-types";
import { renderUserVerifyStatus } from "../../../../../../utils/render";
import EvaluateModal from "./EvaluateModal";
import projectServices from "../../../../../../services/projectServices";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { ProjectStatus } from "../../../../../../constant/project";
const Member = ({ member, projectStatus }) => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const userInfo = useSelector((state) => state.user.userInfo);
  const queryClient = useQueryClient();
  const onSubmit = async (values) => {
    const res = await projectServices.evaluate({
      user_id: member._id,
      content: values.content,
      star: values.star,
      project_id: id,
    });
    if (res) {
      message.success("Đánh giá thành công");
      queryClient.invalidateQueries(["member", id]);
      queryClient.invalidateQueries(["getDetailProject", id]);
      setOpen(false);
    }
  };

  return (
    <div>
      <div className="relative inline-block items-center font-sans m-1 mx-5 p-3 rounded-xl bg-shadow ">
        <div className="flex">
          <Avatar src={member?.avatar} className="" size={45} />
          <div className="">
            <p className="ml-1 text-[18px] mt-2">{member?.name}</p>
            <div className="flex items-center">
              <p className="bg-[#ffb800] px-1 rounded-lg text-white">
                {Number(member?.star.$numberDecimal).toFixed(1)}
              </p>
              <Rate
                allowHalf
                disabled
                defaultValue={Number(member?.star.$numberDecimal).toFixed(1)}
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
        {userInfo._id !== member._id &&
          id &&
          projectStatus === ProjectStatus.Complete && (
            <div
              className="absolute top-2 cursor-pointer right-2"
              onClick={() => setOpen(true)}
            >
              <Tooltip title="Viết đánh giá">
                <i className="text-[25px] fa-solid fa-comment-pen"></i>
              </Tooltip>
            </div>
          )}
      </div>
      <EvaluateModal
        member={member}
        open={open}
        onCancel={() => setOpen(false)}
        onSubmit={onSubmit}
      />
    </div>
  );
};

Member.propTypes = {
  member: PropTypes.object.isRequired,
  projectStatus: PropTypes.number,
};

export default Member;
