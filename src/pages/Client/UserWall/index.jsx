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

const UserWall = () => {
  const { isMobile } = useSelector((state) => state.screen);
  const { userInfo } = useSelector((state) => state.user);
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const { id } = useParams();
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
    <div className="w-full h-full bg-white">
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
          {!isMyProfile && (
            <Button className="bg-main mr-5 text-white">
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
              <div className="text-xl font-bold">{data?.star}</div>
              <Rate value={data?.star} />
            </div>
            <div className="flex  items-center gap-2">
              <i className="fas fa-tasks-alt text-xl"></i>
              <div>{data?.project_done} dự án đã hoàn thành</div>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-comment-alt-lines text-xl"></i>
              <div>123 đánh giá</div>
            </div>
          </div>
        </div>
      </div>
      {isMyProfile && (
        <div className="flex justify-end mr-[20px]">
          <Button
            onClick={() => navigate(`/edit-profile/${userInfo._id}`)}
            variant="outlined"
            size="sm"
            color={"blue"}
          >
            <i className="fad fa-edit text-[18px]"></i> Chỉnh sửa trang cá nhân
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
      {isMyProfile && (
        <VerifyModal
          open={openVerifyModal}
          onCancel={() => setOpenVerifyModal(false)}
          onConfirm={handleOnConrirmRequestVerify}
        ></VerifyModal>
      )}
    </div>
  );
};

export default UserWall;
