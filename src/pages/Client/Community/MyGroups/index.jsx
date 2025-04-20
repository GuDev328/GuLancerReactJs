import React from "react";
import { Avatar, Button, Chip, Input } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import groupServices from "@/services/groupServices";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { GroupType } from "../../../../constant/group";
import { formatNumber } from "@/utils/common";
import { isPending } from "@reduxjs/toolkit";
const MyGroups = () => {
  const getGroups = useQuery({
    queryKey: ["getListGroup"],
    queryFn: groupServices.getGroups,
  });
  const navigate = useNavigate();
  return (
    <div className="w-[98%] mt-3">
      <div>
        <p className="font-bold text-[20px]">
          Yêu cầu tham gia cộng đồng đang chờ
        </p>
        <p>
          Xem các nhóm và kênh bảng feed mà bạn đã yêu cầu tham gia. Chờ đợi cho
          đến khi quản trị viên phê duyệt yêu cầu tham gia của bạn.
        </p>
        <div className="flex flex-wrap w-full  gap-3">
          <Spin spinning={getGroups.isLoading} />
          {getGroups.data?.result?.map((group) => {
            if (group.isPending) {
              return (
                <div
                  key={group._id}
                  className="w-[95%] md:w-[48%] rounded-lg  bg-white flex flex-col"
                >
                  <div className=" cursor-pointer flex  mt-0 rounded-md  py-2  items-center">
                    <Avatar
                      src={group.cover_photo}
                      className="ml-5 mr-3 w-[70px] h-[70px]"
                      alt="avatar"
                      variant="rounded"
                    />
                    <div>
                      <p className="font-medium">{group.name}</p>
                      <p className="text-[13px]">
                        {group.type === GroupType.PUBLIC ? (
                          <span>
                            <i className="fad fa-globe-asia"></i> Nhóm công khai
                          </span>
                        ) : (
                          <span>
                            <i className="fad fa-lock-alt"></i> Nhóm riêng tư
                          </span>
                        )}
                        <span className="ml-2">
                          <i className="fad fa-users"></i>{" "}
                          {formatNumber(group.member_count)} thành viên
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-2 justify-around">
                    <Button variant="outlined" className="w-[80%] " size="sm">
                      Đang xét duyệt
                    </Button>
                    <Button
                      className=" text-main bg-white border border-main"
                      size="sm"
                    >
                      <i className="fa-solid fa-ellipsis-stroke-vertical"></i>
                    </Button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div>
        <p className="font-bold text-[20px]">Cộng đồng do bạn quản lý</p>
        <p>Cộng đồng do bạn làm quản trị viên</p>

        <div className="ownerGroup  m-3 flex flex-col items-center ">
          <Spin spinning={getGroups.isLoading} />
          <div className="flex flex-wrap w-full  gap-3">
            {getGroups.data?.result?.map((group) => {
              if (group.isAdmin && !group.isPending) {
                return (
                  <div
                    key={group._id}
                    className="w-[95%] md:w-[48%] rounded-lg bg-white flex flex-col"
                  >
                    <div className=" cursor-pointer flex  mt-0 rounded-md  py-2  items-center">
                      <Avatar
                        src={group.cover_photo}
                        className="ml-5 mr-3 w-[70px] h-[70px]"
                        alt="avatar"
                        variant="rounded"
                      />
                      <div>
                        <p className="font-medium">{group.name}</p>
                        <p className="text-[13px]">
                          {group.type === GroupType.PUBLIC ? (
                            <span>
                              <i className="fad fa-globe-asia"></i> Nhóm công
                              khai
                            </span>
                          ) : (
                            <span>
                              <i className="fad fa-lock-alt"></i> Nhóm riêng tư
                            </span>
                          )}
                          <span className="ml-2">
                            <i className="fad fa-users"></i>{" "}
                            {formatNumber(group.member_count)} thành viên
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-2 justify-around">
                      <Button
                        onClick={() => navigate(`/community/${group._id}`)}
                        className="w-[80%] bg-main"
                        size="sm"
                      >
                        Xem nhóm
                      </Button>
                      <Button
                        className=" text-main bg-white border border-main"
                        size="sm"
                      >
                        <i className="fa-solid fa-ellipsis-stroke-vertical"></i>
                      </Button>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      <div>
        <p className="font-bold text-[20px]">Cộng đồng bạn đã tham gia</p>

        <div className="flex flex-wrap w-full  gap-3">
          <Spin spinning={getGroups.isLoading} />
          {getGroups.data?.result?.map((group) => {
            if (!group.isAdmin && !group.isPending) {
              return (
                <div
                  key={group._id}
                  className="w-[95%] md:w-[48%] rounded-lg  bg-white flex flex-col"
                >
                  <div className=" cursor-pointer flex  mt-0 rounded-md  py-2  items-center">
                    <Avatar
                      src={group.cover_photo}
                      className="ml-5 mr-3 w-[70px] h-[70px]"
                      alt="avatar"
                      variant="rounded"
                    />
                    <div>
                      <p className="font-medium">{group.name}</p>
                      <p className="text-[13px]">
                        {group.type === GroupType.PUBLIC ? (
                          <span>
                            <i className="fad fa-globe-asia"></i> Nhóm công khai
                          </span>
                        ) : (
                          <span>
                            <i className="fad fa-lock-alt"></i> Nhóm riêng tư
                          </span>
                        )}
                        <span className="ml-2">
                          <i className="fad fa-users"></i>{" "}
                          {formatNumber(group.member_count)} thành viên
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-2 justify-around">
                    <Button
                      onClick={() => navigate(`/community/${group._id}`)}
                      className="w-[80%] bg-main"
                      size="sm"
                    >
                      Xem nhóm
                    </Button>
                    <Button
                      className=" text-main bg-white border border-main"
                      size="sm"
                    >
                      <i className="fa-solid fa-ellipsis-stroke-vertical"></i>
                    </Button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default MyGroups;
