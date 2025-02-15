import React from "react";
import { Chip } from "@material-tailwind/react";
import PropTypes from "prop-types";
import MarkdownView from "@/components/utils/MarkdownView";
import { formatDateTime } from "@/utils/common";

const OverviewProject = ({ detailProject }) => {
  return (
    <div className="text-[15px]">
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
          ? formatDateTime(detailProject?.start_date)
          : "Chưa bắt đầu"}
      </p>
      <p className="mt-2 ">
        <strong>Ngày dự kiến kết thúc dự án:</strong>{" "}
        {detailProject?.end_date
          ? formatDateTime(detailProject?.end_date)
          : "Chưa dự kiến"}
      </p>
    </div>
  );
};

OverviewProject.propTypes = {
  detailProject: PropTypes.object,
};

export default OverviewProject;
