import React from "react";
import { Chip } from "@material-tailwind/react";
import PropTypes from "prop-types";
import MarkdownView from "@/components/utils/MarkdownView";
import { formatDate } from "@/utils/common";
import MyButton from "./../../../../../components/core/MyButton";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import projectServices from "@/services/projectServices";
import { message } from "antd";
import { ProjectStatus } from "../../../../../constant/project";

const OverviewProject = ({ detailProject }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const res = await projectServices.deleteProject(detailProject?._id);
    if (res.status === 200) {
      message.success("Xoá dự án thành công!");
      navigate("/projects");
    } else {
      console.log(res);
      message.error("Xoá dự án thất bại!");
    }
  };

  return (
    <div className="text-[15px]">
      <div className="flex justify-end gap-2">
        <MyButton
          onClick={() => navigate(`/projects/update/${detailProject?._id}`)}
          variant="outlined"
          size="sm"
          color={"blue"}
        >
          <i className="fad fa-edit text-[18px]"></i> Chỉnh sửa thông tin
        </MyButton>
        {(detailProject?.status === ProjectStatus.NotReady ||
          detailProject?.status === ProjectStatus.Recruiting) && (
          <MyButton
            onClick={handleDelete}
            variant="outlined"
            size="sm"
            color={"red"}
          >
            <i className="fa-solid fa-trash-xmark text-[18px]"></i> Xoá dự án
          </MyButton>
        )}
      </div>
      <div className="h-auto">
        <MarkdownView data={detailProject?.description} />
      </div>
      <div className="flex flex-wrap">
        <p className="font-bold m-1">Lĩnh vực: </p>
        {detailProject?.field_info.map((field) => (
          <Chip
            key={field._id}
            variant="ghost"
            className="m-1"
            value={field?.name}
          />
        ))}
      </div>
      <div className="flex flex-wrap">
        <p className="font-bold m-1">Công nghệ: </p>
        {detailProject?.tech_info.map((tech) => (
          <Chip
            key={tech._id}
            variant="ghost"
            className="m-1"
            value={tech?.name}
          />
        ))}
      </div>

      <p className="mt-2 ">
        <strong>Ngày bắt đầu dự án:</strong>{" "}
        {detailProject?.start_date
          ? formatDate(detailProject?.start_date)
          : "Chưa bắt đầu"}
      </p>
      <p className="mt-2 ">
        <strong>Ngày dự kiến kết thúc dự án:</strong>{" "}
        {detailProject?.end_date
          ? formatDate(detailProject?.end_date)
          : "Chưa dự kiến"}
      </p>
    </div>
  );
};

OverviewProject.propTypes = {
  detailProject: PropTypes.object,
};

export default OverviewProject;
