import { Button } from "@material-tailwind/react";
import { Avatar, Rate } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import MarkdownView from "@/components/utils/MarkdownView";
import UserName from "@/components/business/UserName";
import { UserVerifyStatus } from "../../../../constant/user";
import { renderUserVerifyStatus } from "../../../../utils/render";
import { formatCurrency } from "@/utils/common";
const Freelancer = ({ data }) => {
  //const isMobile = useSelector((state) => state.screen.isMobile);
  return (
    <div className="relative mb-2 flex justify-between bg-white w-[100%] rounded-3xl md:pb-10 xl:pb-5 p-5">
      <div className="flex xl:w-[45%]">
        <div className="w-[55px]">
          <Avatar src={data.avatar} className="" size={55} />
        </div>
        <div className="">
          <UserName data={data} />
          <div className="flex items-center">
            <p className="bg-[#ffb800] px-1 text-[15px] rounded-lg text-white">
              {data.star.$numberDecimal}
            </p>

            <Rate
              allowHalf
              className="text-[18px]"
              disabled
              value={data?.star.$numberDecimal}
            />
            <p className="ml-1 text-[13px] text-main">
              {data?.evaluationCount} đánh giá
            </p>
            <p className="  ml-1 text-[13px] text-main">
              {data?.projectsDone} dự án đã hoàn thành
            </p>
          </div>

          {renderUserVerifyStatus(data?.verified_info.status)}
          <p className="hidden md:block text-[15px] text-main">
            <span className="text-black">Lĩnh vực : </span>
            {data.fields_info.map((item) => item.name).join(", ")}
          </p>
          <p className="hidden md:block text-[15px] text-main">
            <span className="text-black">Công nghệ : </span>
            {data.technologies_info.map((item) => item.name).join(", ")}
          </p>
        </div>
      </div>
      <div className="hidden  xl:block lg:w-[40%]  ">
        <MarkdownView isPart={true} data={data.description} />
      </div>
      <div className=" hidden xl:flex w-[150px]  flex-col items-end">
        <Button size="sm" className="bg-main">
          <i className="text-[18px] mr-1 far fa-comment-alt-lines"></i>
          Liên hệ ngay
        </Button>
        <p className="text-gray-600">{formatCurrency(data.salary)}/ giờ</p>
      </div>
      <Button
        size="sm"
        className="bg-main absolute xl:hidden  bottom-2 right-4 "
      >
        Xem chi tiết
      </Button>
    </div>
  );
};

Freelancer.propTypes = {
  data: PropTypes.object,
};

export default Freelancer;
