import React from "react";
import { Avatar, Tabs } from "antd";
import OverviewProject from "./Overview";
import Members from "./Members";
import { useQuery } from "@tanstack/react-query";
import projectServices from "@/services/projectServices";
import { useParams } from "react-router-dom";
import { formatCurrency } from "@/utils/common";
import ApplyInviteManagement from "./Apply-Invite";
import { useSelector } from "react-redux";
import { UserRole } from "@/constant/user";
import Tasks from "./Tasks";
import Chat from "./Chat";
import ProjectStatusComponent from "./components/ProjectStatus";
import MyProgress from "./MyProgress";
import Management from "./Management";
import { useContext } from "react";
import { ProjectInfoContext } from "../../../Both/Dispute";
const DetailProject = () => {
  const isMobile = useSelector((state) => state.screen.isMobile);
  const { id } = useParams();
  const disputeInfo = useContext(ProjectInfoContext);
  const projectId = disputeInfo?.projectId;
  console.log(projectId + "adadas");
  const getDetailProject = useQuery({
    queryKey: ["getDetailProject", id || projectId],
    queryFn: () => projectServices.getDetailProject(id || projectId),
  });
  const userInfo = useSelector((state) => state.user.userInfo);
  const isEmployer =
    userInfo?._id === getDetailProject.data?.result[0]?.admin_id;
  const detailProject = getDetailProject.data?.result[0];
  const ProjectTabs = [
    {
      key: "overview",
      label: "Tổng quan",
      children: <OverviewProject detailProject={detailProject} />,
      icon: <i className="fa-regular fa-layer-group"></i>,
    },
    {
      key: "member",
      label: "Thành viên",
      children: <Members />,
      icon: <i className=" fa-regular fa-people-group"></i>,
    },
    {
      key: "tasks",
      label: "Các công việc",
      children: <Tasks />,
      icon: <i className="fa-regular fa-boxes-stacked"></i>,
    },
    {
      key: "discussion",
      label: "Thảo luận",
      children: <Chat projectId={detailProject?._id} />,
      icon: <i className="fa-solid fa-messages"></i>,
    },
    userInfo?.role === UserRole.FREELANCER && {
      key: "about-me",
      label: "Tiến trình",
      children: (
        <MyProgress
          reRender={() => getDetailProject.refetch()}
          projectId={detailProject?._id}
        />
      ),
      icon: <i className="fa-solid fa-bullseye-arrow"></i>,
    },
    (userInfo?.role === UserRole.EMPLOYER ||
      userInfo?.role === UserRole.ADMIN) && {
      key: "management",
      label: "Quản lý",
      children: (
        <Management
          reRender={() => getDetailProject.refetch()}
          projectId={detailProject?._id}
        />
      ),
      icon: <i className="fa-solid fa-people-arrows"></i>,
    },
    userInfo?.role === UserRole.EMPLOYER && {
      key: "apply-invite",
      label: "Lời mời, Ứng tuyển",
      children: <ApplyInviteManagement projectId={detailProject?._id} />,
      icon: <i className="far fa-envelope"></i>,
    },
  ];
  return (
    <div className="bg-white  m-3 rounded-xl p-3 pt-0">
      <div className="flex font-bold justify-between items-center text-[21px]">
        <p>{detailProject?.title}</p>
        <div className="leading-5 mt-2">
          <p className="text-gray-400 text-[14px] font-normal">
            {detailProject?.salaryType === 0
              ? "Trả theo dự án"
              : "Trả theo giờ"}
          </p>
        </div>
      </div>
      <ProjectStatusComponent
        reRender={() => getDetailProject.refetch()}
        status={detailProject?.status}
        isEmployer={isEmployer}
        projectId={detailProject?._id}
      />
      <div className="flex items-center ">
        <Avatar
          className="w-[40px] h-[40px]"
          src={detailProject?.admin_info?.avatar}
          size={40}
        />
        <div className=" leading-none ml-1 mt-[13px]">
          <div className=" flex items-end">
            <p className="mr-1">{detailProject?.admin_info?.name}</p>
            <i className=" fa-solid fa-star" style={{ color: "#FFB800" }}></i>
            <p>
              {Number(detailProject?.admin_info?.star.$numberDecimal).toFixed(
                1
              )}
              /5.0
            </p>
            <p className=" hidden sm:inline-block ml-1 text-[13px] text-gray-500">
              Với {detailProject?.admin_info?.projectsDone} dự án đã hoàn thành
            </p>
          </div>
          <p className="text-[13px]" style={{ color: "#31c740" }}>
            <i className="fa-light mr-1 fa-ballot-check"></i>
            Đã xác thực
          </p>
        </div>
      </div>

      <div className="text-[21px] font-sans ml-5">
        <Tabs
          size="large"
          defaultActiveKey="overview"
          items={ProjectTabs}
          tabBarExtraContent={
            <i className="text-[20px] mx-3 mt-4 fa-duotone fa-solid fa-bars"></i>
          }
        />
      </div>
    </div>
  );
};

export default DetailProject;
