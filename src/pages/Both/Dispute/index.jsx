import React from "react";
import AdminLayout from "../../Admin/Layout";

import { useSelector } from "react-redux";
import { UserRole } from "../../../constant/user";
import Header from "../../Client/Layout/components/Header";
import Footer from "../../Client/Layout/components/Footer";
import { useParams } from "react-router-dom";
import projectServices from "../../../services/projectServices";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import UserName from "../../../components/business/UserName";
import { useMemo } from "react";
import { Image } from "antd";
import { renderStatusDispute } from "../../../utils/render";
import { Tabs } from "antd";
import Proof from "./components/Proof";
import Chat from "./components/Chat";
import Resolve from "./components/Resolve";
import DotMenuDropdown from "../../../components/core/DotMenuDropdown";
import { message } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import DetailProject from "../../Client/Projects/DetailProject";

export const StatusDisputeContext = createContext();
export const ProjectInfoContext = createContext();
function DisputeMainPage() {
  const { dispute_id } = useParams();
  const [isDisputeCanceled, setIsDisputeCanceled] = useState(false);

  const [disputeInfo, setDisputeInfo] = useState(null);
  const userInfo = useSelector((state) => state.user.userInfo);
  const {
    data: dispute,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["dispute", dispute_id],
    queryFn: () => projectServices.getDispute(dispute_id),
  });

  useEffect(() => {
    dispute &&
      setIsDisputeCanceled(
        dispute?.status === "RESOLVED_PAY_ALL" ||
          dispute?.status === "RESOLVED_PAY_PART" ||
          dispute?.status === "RESOLVED_NOT_PAY" ||
          dispute?.status === "CANCEL"
      );
    dispute &&
      setDisputeInfo({
        projectId: dispute?.project_info?._id,
        freelancerId: dispute?.freelancer_info_id,
        employerId: dispute?.employer_info_id,
      });
  }, [dispute]);

  const reporter_info = useMemo(() => {
    return dispute?.employer_info?._id === dispute?.reporter
      ? dispute?.employer_info
      : dispute?.freelancer_info;
  }, [dispute]);

  const reporter_proof = useMemo(() => {
    return dispute?.employer_info?._id === dispute?.reporter
      ? dispute?.employer_proof
      : dispute?.freelancer_proof;
  }, [dispute]);

  const defendant_proof = useMemo(() => {
    return dispute?.employer_info?._id === dispute?.reporter
      ? dispute?.freelancer_proof
      : dispute?.employer_proof;
  }, [dispute]);

  const isEditableReporter = useMemo(() => {
    return dispute?.reporter === userInfo._id;
  }, [dispute]);

  if (isLoading)
    return (
      <div>
        <Spin spinning />
      </div>
    );

  const itemsTab = [
    {
      key: "1",
      label: "Về phía người khởi kiện",
      children: (
        <Proof
          editable={isEditableReporter && userInfo.role !== UserRole.ADMIN}
          proof={reporter_proof}
        />
      ),
    },
    {
      key: "2",
      label: "Về phía người bị kiện",
      children: (
        <Proof
          editable={!isEditableReporter && userInfo.role !== UserRole.ADMIN}
          proof={defendant_proof}
        />
      ),
    },
    {
      key: "3",
      label: "Thảo luận chung",
      children: <Chat />,
    },
    {
      key: "4",
      label: "Giải quyết",
      children: <Resolve />,
    },
    userInfo?.role === UserRole.ADMIN && {
      key: "5",
      label: "Chi tiết dự án",
      children: !isDisputeCanceled ? (
        dispute.freelancer_proof.admin_into_project &&
        dispute.employer_proof.admin_into_project ? (
          <ProjectInfoContext.Provider value={disputeInfo}>
            <DetailProject />
          </ProjectInfoContext.Provider>
        ) : (
          <div className="flex justify-center items-center">
            Hai bên không đồng ý cho phép Admin vào chi tiết dự án
          </div>
        )
      ) : (
        <div className="flex justify-center items-center">
          Tranh chấp đã đóng lại
        </div>
      ),
    },
  ];
  const handleChangeStatus = async (status) => {
    const res = await projectServices.changeStatusDispute(dispute_id, status);
    if (res.status === 200) {
      message.success("Cập nhật thành công!");
      refetch();
    }
  };
  const cancelDispute = async () => {
    const res = await projectServices.cancelDispute(dispute_id);
    if (res.status === 200) {
      message.success("Hủy tranh chấp thành công!");
      refetch();
    }
  };
  const actionStatus = () => {
    if (reporter_info._id === userInfo._id) {
      return [
        {
          label: "Hủy tranh chấp",
          onClick: () => {
            cancelDispute();
          },
        },
      ];
    } else if (userInfo.role === UserRole.ADMIN) {
      return [
        {
          label: "Tiến hành giải quyết",
          onClick: () => {
            handleChangeStatus("PROCESSING");
          },
        },
        {
          label: "Cần thêm bằng chứng",
          onClick: () => {
            handleChangeStatus("NEED_MORE_PROOF");
          },
        },
      ];
    } else return [];
  };

  return (
    <StatusDisputeContext.Provider value={{ isDisputeCanceled }}>
      <div className="m-4 p-4 bg-white h-full rounded-md">
        <div>
          <div className="font-bold text-[20px]">
            {" "}
            Tranh chấp dự án: {dispute.project_info.title}
            {renderStatusDispute(dispute.status)}
            {!isDisputeCanceled && <DotMenuDropdown items={actionStatus()} />}
          </div>
          <div className="text-gray-500 text-[13px]">
            Mã dự án: {dispute.project_info._id}
          </div>
          <div className="flex  text-[14px] items-center gap-2">
            Người tạo tranh chấp: <UserName data={reporter_info} />
          </div>
          <div className="flex flex-wrap  text-[14px] items-center">
            <div className="flex mr-11 items-center gap-2">
              Freelancer:{" "}
              <Image
                width={50}
                style={{ objectFit: "cover", borderRadius: "20px" }}
                src={dispute.freelancer_info.avatar}
              />{" "}
              <UserName data={dispute.freelancer_info} />
            </div>
            <div className="flex  items-center gap-2">
              Employer:{" "}
              <Image
                width={50}
                style={{ objectFit: "cover", borderRadius: "20px" }}
                src={dispute.employer_info?.avatar}
              />{" "}
              <UserName data={dispute.employer_info} />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Tabs items={itemsTab} style={{ fontSize: "16px" }} />
        </div>
      </div>
    </StatusDisputeContext.Provider>
  );
}

function DisputePageLayoutAdmin() {
  return (
    <AdminLayout>
      <DisputeMainPage />
    </AdminLayout>
  );
}

function DisputePageLayoutClient() {
  return (
    <>
      <Header />
      <div className="min-h-[60vh]">
        <DisputeMainPage />
      </div>
      <Footer />
    </>
  );
}

export default function DisputePage() {
  const userInfo = useSelector((state) => state.user.userInfo);
  return userInfo.role === UserRole.ADMIN ? (
    <DisputePageLayoutAdmin />
  ) : (
    <DisputePageLayoutClient />
  );
}
