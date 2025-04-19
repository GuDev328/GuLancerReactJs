import React, { useState } from "react";
import { Button, Chip } from "@material-tailwind/react";
import PropTypes from "prop-types";
import MarkdownView from "@/components/utils/MarkdownView";
import { formatCurrency } from "@/utils/common";
import { Avatar } from "antd";
import { useSelector } from "react-redux";
import Apply from "./Apply";
import { formatDate } from "./../../../../utils/common";
import { renderUserVerifyStatus } from "../../../../utils/render";
const OverviewProject = ({ detailProject }) => {
  const isMobile = useSelector((state) => state.screen.isMobile);
  const [open, setOpen] = useState(false);
  return (
    <div className="text-[15px] bg-white px-4 m-3 rounded-md">
      <div className="flex flex-wrap font-bold justify-between items-center text-[21px]">
        <p className="flex-shrink-0">{detailProject?.title}</p>
        <div className="leading-5 mt-2">
          <p className=" text-main">
            {detailProject ? formatCurrency(detailProject?.recruitmentInfo?.salary) : "0"}
          </p>
          <p className="text-gray-400 text-[14px]  font-normal">
            {detailProject?.salaryType === 0
              ? "Trả theo dự án"
              : "Trả theo giờ"}
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="font-bold text-gray-600 ml-1">
          Hạn ứng tuyển: {formatDate(detailProject?.recruitmentInfo?.deadline)}
        </div>
        <Button
          onClick={() => setOpen(true)}
          className="bg-main"
          size={isMobile ? "sm" : "md"}
        >
          Ứng tuyển ngay
        </Button>
      </div>
      <div className="flex items-center ">
        <div className="font-bold mx-1 flex-shrink-0">Chủ đầu tư: </div>
        <div className="h-[43px] w-[43px]">
          <Avatar
            size={43}
            className="bg-main"
            src={detailProject?.admin_info?.avatar}
          />
        </div>
        <div className=" leading-none ml-1 mt-[13px]">
          <div className=" flex items-end flex-wrap">
            <p className="mr-1">{detailProject?.admin_info?.name}</p>
            <div className="flex items-center">
              <i className=" fa-solid fa-star" style={{ color: "#FFB800" }}></i>
              <p>{detailProject?.admin_info?.star}/5.0</p>
            </div>
            <p className="  inline-block ml-1 text-[13px] text-gray-500">
              Với {detailProject?.admin_info?.project_done} dự án đã hoàn
              thành
            </p>
          </div>
          {renderUserVerifyStatus(
            detailProject?.admin_info.verified_info.status
          )}
        </div>
      </div>
      <div className="flex items-center ">
        <div className="mx-1 flex-shrink-0">
          <strong>Cần tuyển:</strong>{" "}
          {detailProject?.recruitmentInfo?.number_people} Freelancer
        </div>
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
      <div className="flex items-center ">
        <div className="mx-1 flex-shrink-0">
          <strong>Dự án dự kiến kết thúc vào:</strong>{" "}
          {formatDate(detailProject?.end_date)}
        </div>
      </div>
      <div className="h-auto">
        <MarkdownView data={detailProject?.description} />
      </div>
      <Apply open={open} projectId={detailProject?._id} setOpen={setOpen} />
    </div>
  );
};

OverviewProject.propTypes = {
  detailProject: PropTypes.object,
};

export default OverviewProject;
