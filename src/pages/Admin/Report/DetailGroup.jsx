import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import groupServices from "@/services/groupServices";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Input } from "antd";

import { useSelector } from "react-redux";
import { Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { message } from "antd";
import PostsGroup from "../../Client/Community/Group/GroupPosts";

const DetailGroup = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const { id } = useParams();
  const navigate = useNavigate();
  const [openCreatePostModal, setOpenCreatePostModal] = React.useState(false);
  const [showReportModal, setShowReportModal] = React.useState(false);
  const [reportDescription, setReportDescription] = React.useState("");
  const fetchDetailGroup = useQuery({
    queryKey: ["getGroupById", id],
    queryFn: async () => await groupServices.getGroupById(id),
    onError: (error) => console.error(error),
  });
  const detaiGroup = fetchDetailGroup?.data?.result;
  const isAdmin = detaiGroup?.admin_id.includes(userInfo?._id);

  return (
    <div className="mt-3  w-[98%] ">
      <div className="Banner relative">
        <img
          src={detaiGroup?.cover_photo}
          className="h-72 rounded-bl-xl rounded-br-xl w-full object-cover object-center"
        />
        <div className="absolute w-full flex justify-between items-center py-2 pl-4 text-white  rounded-bl-xl rounded-br-xl bg-main bottom-0">
          <div>
            <p className="font-bold text-[22px] ">{detaiGroup?.name}</p>
            {detaiGroup?.type === 0 ? (
              <p className=" ml-2 text-[14px]">
                <i className="fad fa-globe-asia"></i> Nhóm công khai
              </p>
            ) : (
              <p className=" ml-2 text-[14px]">
                <i className="fad fa-lock-alt"></i> Nhóm riêng tư
              </p>
            )}
          </div>
          <div className="mr-3"></div>
        </div>
      </div>
      <div className="flex mt-3 items-start justify-between">
        <div className="w-full lg:w-[65%]">
          <PostsGroup group_id={id} />
        </div>
        <div className="rounded-lg p-3 mr-7 hidden lg:block bg-white lg:w-[30%]">
          <p className="font-bold text-[19px] mb-2">Giới thiệu</p>
          <p className="text-[15px] mb-1">{detaiGroup?.description}</p>
          {detaiGroup?.type === 0 ? (
            <>
              <p className="mb-1 font-bold text-[19px]">
                <i className="fad fa-globe-asia"></i> Công khai
              </p>
              <p className="text-[15px] ml-5">
                Mọi người đều có thể nhìn thấy mọi người trong nhóm và những gì
                họ đăng.
              </p>
            </>
          ) : (
            <>
              <p className="mb-1 font-bold text-[19px]">
                <i className="fad fa-lock-alt mr-2"></i> Riêng tư
              </p>
              <p className="text-[15px] ml-5">
                Chỉ thành viên mới nhìn thấy mọi người trong nhóm và những gì họ
                đăng.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailGroup;
