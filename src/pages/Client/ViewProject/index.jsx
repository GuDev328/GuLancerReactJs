import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import projectServices from "@/services/projectServices";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import OverviewProject from "./components/OverView";
const ViewProject = () => {
  const { id } = useParams();
  const project = useQuery({
    queryKey: ["project", id],
    queryFn: () => projectServices.getDetailProject(id),
  });
  if (project.isLoading) {
    return <Spin className="h-[50vh] w-full place-content-center"></Spin>;
  }
  console.log(project.data?.result[0]);
  const data = project.data?.result[0];
  return (
    <div>
      <OverviewProject detailProject={data} />
    </div>
  );
};

export default ViewProject;
