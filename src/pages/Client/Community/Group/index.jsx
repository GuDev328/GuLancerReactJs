import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import groupServices from "@/services/groupServices";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Spin, Input } from "antd";
import { data } from "jquery";

import { useSelector } from "react-redux";
import CreatePostModal from "./CreatePostModal";
import PostsGroup from "./GroupPosts";
import DotMenuDropdown from "./../../../../components/core/DotMenuDropdown";
import { Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { message } from "antd";
import { showConfirmModal } from "../../../../components/core/MyModal";
import MyModal from "../../../../components/core/MyModal";
import { useState } from "react";

const Group = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [posts, setPosts] = useState([]);
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

  const handleReport = async () => {
    try {
      await groupServices.reportGroup(id, reportDescription);
      message.success("Báo cáo thành công!");
      setShowReportModal(false);
      setReportDescription("");
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      message.error("Có lỗi xảy ra khi báo cáo!");
    }
  };

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
          <div className="mr-3">
            {isAdmin && (
              <Tooltip title="Quản lý" className="cursor-pointer">
                <i
                  onClick={() => navigate(`/community/setting-group/${id}`)}
                  className="fa-solid mr-2 fa-bars-progress"
                ></i>
              </Tooltip>
            )}
            {!isAdmin && (
              <DotMenuDropdown
                items={[
                  {
                    label: (
                      <div className="text-red-500">
                        <i className="fa-solid  fa-right-from-bracket"></i> Rời
                        nhóm
                      </div>
                    ),
                    onClick: () => {
                      showConfirmModal({
                        title: "Xác nhận",
                        content: "Bạn có chắc chắn muốn rời cộng đồng này?",
                        onOk: async () => {
                          const res = await groupServices.leaveGroup(id);
                          if (res) {
                            message.success(res.data.message);
                            navigate(`/community/my-groups`);
                            Modal.destroyAll();
                          }
                        },
                      });
                    },
                  },
                  {
                    label: (
                      <div className="text-main">
                        <i className="fa-solid fa-flag-swallowtail"></i> Báo cáo
                        cộng đồng
                      </div>
                    ),
                    onClick: () => setShowReportModal(true),
                  },
                ]}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex mt-3 items-start justify-between">
        <div className="w-full lg:w-[65%]">
          <div className="w-full rounded-xl p-5  bg-white">
            <div className="flex w-full ">
              <Avatar size={50} src={userInfo?.avatar} />
              <div
                onClick={() => setOpenCreatePostModal(true)}
                className="bg-blue-gray-100 cursor-pointer ml-1 w-[93%] py-3 px-5 rounded-3xl "
              >
                Bạn muốn chia sẻ điều gì ...
              </div>
            </div>
          </div>

          <PostsGroup group_id={id} posts={posts} setPosts={setPosts} />
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
      {/* </Spin> */}
      <CreatePostModal
        groupId={id}
        groupName={detaiGroup?.name}
        open={openCreatePostModal}
        setOpen={setOpenCreatePostModal}
        setPosts={setPosts}
      />

      <MyModal
        open={showReportModal}
        title="Báo cáo cộng đồng"
        onCancel={() => {
          setShowReportModal(false);
          setReportDescription("");
        }}
        onConfirm={handleReport}
      >
        <Input.TextArea
          rows={4}
          placeholder="Nhập mô tả báo cáo..."
          value={reportDescription}
          onChange={(e) => setReportDescription(e.target.value)}
        />
      </MyModal>
    </div>
  );
};

export default Group;
