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
function DisputeMainPage() {
  const { dispute_id } = useParams();
  const userInfo = useSelector((state) => state.user.userInfo);
  const { data: dispute, isLoading } = useQuery({
    queryKey: ["dispute", dispute_id],
    queryFn: () => projectServices.getDispute(dispute_id),
  });
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
      children: <Proof editable={isEditableReporter} proof={reporter_proof} />,
    },
    {
      key: "2",
      label: "Về phía người bị kiện",
      children: (
        <Proof editable={!isEditableReporter} proof={defendant_proof} />
      ),
    },
    {
      key: "3",
      label: "Thảo luận chung",
      children: <Chat />,
    },
  ];

  return (
    <div className="m-4 p-4 bg-white h-full rounded-md">
      <div>
        <div className="font-bold text-[20px]">
          {" "}
          Tranh chấp dự án: {dispute.project_info.title}
          {renderStatusDispute(dispute.status)}
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
              src={dispute.employer_info.avatar}
            />{" "}
            <UserName data={dispute.employer_info} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Tabs items={itemsTab} style={{ fontSize: "16px" }} />
      </div>
    </div>
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
