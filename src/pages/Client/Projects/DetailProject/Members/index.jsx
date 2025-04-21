import React from "react";
import Member from "./components/Member";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import projectServices from "@/services/projectServices";
import { Spin } from "antd";
import { useContext } from "react";
import { ProjectInfoContext } from "../../../../Both/Dispute";

const Members = () => {
  const { id } = useParams();
  const disputeInfo = useContext(ProjectInfoContext);
  const projectId = disputeInfo?.projectId;
  const { data, isLoading } = useQuery({
    queryKey: ["member", id || projectId],
    queryFn: () => projectServices.getMember(id || projectId),
  });

  if (isLoading) return <Spin spinning={true} className="w-full h-full" />;
  return (
    <div className="flex flex-wrap">
      {data.result &&
        data.result.map((member) => (
          <Member key={member?._id} member={member} />
        ))}
      {data.result.length === 0 && (
        <p className="text-center w-full py-[100px] text-gray-500">
          Chưa có thành viên nào trong dự án
        </p>
      )}
    </div>
  );
};

export default Members;
