import { Button, Chip } from "@material-tailwind/react";
import { Avatar, Image, Rate, Spin } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import MarkdownView from "@/components/utils/MarkdownView";
import { useNavigate, useParams } from "react-router-dom";
import userServices from "@/services/userServices";
import { useQuery } from "@tanstack/react-query";
import UserName from "@/components/business/UserName";
import { formatCurrency } from "@/utils/common";
import { UserRole } from "@/constant/user";
import dayjs from "dayjs";
import VerifyModal from "./VerifyModal";
import { UserVerifyStatus } from "../../../constant/user";
import {
  renderFullUserVerifyStatus,
  renderUserVerifyStatus,
} from "../../../utils/render";
import conversationServices from "../../../services/conversationServices";
import Invite from "./InviteProject";
import ChangePasswordModal from "./ChangePasswordModal";
import { useEffect } from "react";

const UserWall = () => {
  const { isMobile } = useSelector((state) => state.screen);
  const { userInfo } = useSelector((state) => state.user);
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const { id } = useParams();
  const [userEvaluate, setUserEvaluate] = useState([]);
  const [pageEvaluate, setPageEvaluate] = useState({
    current: 1,
    total: 0,
  });
  const {
    isLoading,
    data: dataUser,
    refetch,
  } = useQuery({
    queryKey: ["getUser", id],
    queryFn: async () => await userServices.getDetailUser(id),
  });
  const data = dataUser?.result;
  const navigate = useNavigate();
  let isMyProfile = false;
  if (userInfo._id === id) {
    isMyProfile = true;
  }
  const fetchUserEvaluate = async () => {
    const response = await userServices.getUserEvaluate(
      id,
      pageEvaluate.current,
      5
    );

    setUserEvaluate((prev) => [...prev, ...response.result.evaluations]);
    setPageEvaluate({
      current: response.result.pagination.page,
      total: response.result.pagination.total_pages,
    });
  };
  useEffect(() => {
    fetchUserEvaluate();
  }, [pageEvaluate.current]);

  if (isLoading) return <Spin className="w-full h-full" spinning={true}></Spin>;

  const handleOnConrirmRequestVerify = async () => {
    setOpenVerifyModal(false);
    refetch();
  };

  const handleToChat = async () => {
    await conversationServices.addNewConversation(id);
    navigate("/chat?to=" + id);
  };

  return (
    <div className="w-full h-full bg-white pb-5 mb-2">
      <div className={`w-full relative `}>
        <Image
          width={"100vw"}
          height={"20vh"}
          style={{ objectFit: "cover" }}
          src={data?.cover_photo}
        />
        <div className="absolute flex items-center gap-3  bottom-[0] translate-y-1/2 left-[20px]">
          <div className="bg-white rounded-[20px] p-3 ">
            <Image
              width={isMobile ? 120 : 200}
              style={{ objectFit: "cover", borderRadius: "20px" }}
              src={data?.avatar}
            />
          </div>
        </div>
      </div>
      <div className={`${isMobile ? "ml-[175px]" : "ml-[255px]"}`}>
        <div className="flex flex-wrap text-xl font-bold ">
          <UserName
            nameClassName="text-[20px] mr-2"
            usernameClassName="text-[15px] text-gray-500"
            data={data}
          />
        </div>
        <p className="text-sm text-gray-500">
          {data?.role === 0 ? "Freelancer" : "Employer"}
        </p>
        <div className="flex">
          {isMyProfile
            ? renderFullUserVerifyStatus(data?.verified_info.status)
            : renderUserVerifyStatus(data?.verified_info.status)}

          {isMyProfile &&
            (data?.verified_info.status === UserVerifyStatus.Rejected ||
              data?.verified_info.status === UserVerifyStatus.Unverified) && (
              <span
                onClick={() => setOpenVerifyModal(true)}
                className="text-[15px] ml-2 text-main underline cursor-pointer"
              >
                Xác thực ngay
              </span>
            )}
        </div>
      </div>
      <div className="flex  flex-wrap ml-[20px] md:ml-[255px] flex-col md:flex-row-reverse justify-between">
        <div className="flex gap-x-2 justify-end items-center ">
          {data?.role === UserRole.FREELANCER && (
            <p className={`text-[20px] font-bold ${isMyProfile ? "mr-5" : ""}`}>
              <i className="fas mx-2 text-main fa-money-bill"></i>
              {data?.salary && formatCurrency(data?.salary)}/Giờ
            </p>
          )}

          {!isMyProfile && (
            <Button onClick={handleToChat} variant="outlined" color={"blue"}>
              <i className="fas fa-comment-alt-lines text-[18px]"></i>
            </Button>
          )}
          {!isMyProfile && userInfo?.role === UserRole.EMPLOYER && (
            <Button
              onClick={() => setOpenInviteModal(true)}
              className="bg-main mr-5 text-white"
            >
              <i className="far mr-2 text-[18px] fa-bullseye-pointer"></i>
              Thuê ngay
            </Button>
          )}
        </div>
        <div className="justify-start max-w-[650px] ">
          <div
            className={`flex flex-col md:flex-row flex-wrap gap-x-3 text-[17px] `}
          >
            <div className="flex  items-center gap-2">
              <div className="text-xl font-bold">
                {Number(data?.star.$numberDecimal).toFixed(1)}
              </div>
              <Rate
                allowHalf
                value={Number(data?.star.$numberDecimal).toFixed(1)}
              />
            </div>
            <div className="flex  items-center gap-2">
              <i className="fas fa-tasks-alt text-xl"></i>
              <div>{data?.projectsDone} dự án đã hoàn thành</div>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-comment-alt-lines text-xl"></i>
              <div>{data?.evaluationCount} đánh giá</div>
            </div>
          </div>
        </div>
      </div>
      {isMyProfile && (
        <div className="flex justify-end gap-2 mr-[20px]">
          <Button
            onClick={() => navigate(`/edit-profile/${userInfo._id}`)}
            variant="outlined"
            size="sm"
            color={"blue"}
          >
            <i className="fad fa-edit text-[18px]"></i> Chỉnh sửa trang cá nhân
          </Button>
          <Button
            onClick={() => setOpenChangePasswordModal(true)}
            variant="outlined"
            size="sm"
            color={"blue"}
          >
            <i className="fa-solid fa-key-skeleton text-[18px]"></i> Đổi mật
            khẩu
          </Button>
        </div>
      )}
      {data?.role === UserRole.FREELANCER && (
        <div className="ml-5 mt-2">
          <div className="flex flex-wrap items-center">
            <p className="font-bold m-1">Lĩnh vực công việc: </p>
            {data?.fields_info?.map((field) => (
              <Chip
                key={field._id}
                variant="ghost"
                className="m-1"
                value={field?.name}
              />
            ))}
            {data?.fields?.length === 0 && (
              <p className="text-gray-500">Chưa có lĩnh vực nào</p>
            )}
          </div>
          <div className="flex flex-wrap items-center">
            <p className="font-bold m-1">Công nghệ sử dụng: </p>
            {data?.technologies_info?.map((tech) => (
              <Chip
                key={tech._id}
                variant="ghost"
                className="m-1"
                value={tech?.name}
              />
            ))}
            {data?.technologies?.length === 0 && (
              <p className="text-gray-500">Chưa có công nghệ nào</p>
            )}
          </div>
        </div>
      )}
      <div>
        <span className="font-bold ml-5">Email: </span>
        <span>{data.email}</span>
      </div>
      <div>
        <span className="font-bold ml-5">Số điện thoại: </span>
        <span>{data.phone_number}</span>
      </div>
      <div>
        <span className="font-bold ml-5">Ngày sinh: </span>
        <span>{dayjs(data.date_of_birth).format("DD/MM/YYYY")}</span>
      </div>
      <div>
        <span className="font-bold ml-5">Giới tính: </span>
        <span>{data.gender == 1 ? "Nữ" : "Nam"}</span>
      </div>
      <div>
        <span className="font-bold ml-5">Địa chỉ: </span>
        <span>{data?.location}</span>
      </div>
      <MarkdownView data={data?.description} />
      <div className="flex flex-col gap-2 my-2 mx-5">
        <div className="text-xl font-bold">Các đánh giá</div>
        {userEvaluate.map((evaluate) => (
          <div
            key={evaluate._id}
            className="border-b border-gray-200 pb-2 bg-blue-gray-50 p-2 rounded-xl"
          >
            <div className="flex items-center gap-2">
              <Avatar src={evaluate.reviewer_info.avatar} />
              <UserName data={evaluate.reviewer_info} />
              <Rate value={evaluate.star} allowHalf disabled />
            </div>
            <div className="text-[13px] text-main">
              {evaluate.project_info.title}
            </div>
            <p>{evaluate.content}</p>
          </div>
        ))}
        {userEvaluate.length === 0 && (
          <div className="text-gray-500 text-center my-10">
            Chưa có đánh giá nào
          </div>
        )}
        {pageEvaluate.total > pageEvaluate.current && (
          <p
            className="text-main  cursor-pointer"
            onClick={() =>
              setPageEvaluate({
                ...pageEvaluate,
                current: pageEvaluate.current + 1,
              })
            }
          >
            Xem thêm
          </p>
        )}
      </div>
      {isMyProfile && (
        <VerifyModal
          open={openVerifyModal}
          onCancel={() => setOpenVerifyModal(false)}
          onConfirm={handleOnConrirmRequestVerify}
        ></VerifyModal>
      )}

      {!isMyProfile && (
        <>
          <Invite
            open={openInviteModal}
            setOpen={setOpenInviteModal}
            user_id={id}
          ></Invite>
        </>
      )}
      <ChangePasswordModal
        open={openChangePasswordModal}
        setOpen={setOpenChangePasswordModal}
      ></ChangePasswordModal>
    </div>
  );
};

export default UserWall;
