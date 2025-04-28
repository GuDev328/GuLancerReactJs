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

  const getDetailProject = useQuery({
    queryKey: ["getDetailProject", id || projectId],
    queryFn: () => projectServices.getDetailProject(id || projectId),
  });

  console.log(getDetailProject.data);

  if (isLoading) return <Spin spinning={true} className="w-full h-full" />;
  return (
    <>
      <div>
        <div className="text-[17px] font-bold">Chủ dự án: </div>
        <Member member={getDetailProject.data.result[0].admin_info} />
      </div>
      <div>
        <div className="text-[17px] font-bold">Thành viên dự án</div>
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
      </div>
    </>
  );
};

export default Members;
