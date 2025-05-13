import React, { useEffect, useState } from "react";
import MyModal from "../../../components/core/MyModal";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import userServices from "../../../services/userServices";
import { Col, Image, Rate, Row } from "antd";
import UserName from "@/components/business/UserName";
import dayjs from "dayjs";
import Video from "./../../../components/utils/Media/Video";
import MyButton from "./../../../components/core/MyButton";
import {
  renderJSXRoleUser,
  renderUserVerifyStatus,
} from "../../../utils/render";
import { toast } from "react-toastify";
import { message } from "antd";

export default function DetailModal({ id, open, onCancel, onConfirm }) {
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUser = async () => {
      const res = await userServices.getDetailUser(id);
      setUser(res.result);
    };
    id && fetchUser();
  }, [id]);
  const data = user;

  const handleReject = async () => {
    await userServices.rejectVerify(id);
    message.success("Từ chối xác thực thành công");
    onConfirm();
  };

  const handleApprove = async () => {
    await userServices.approveVerify(id);
    message.success("Phê duyệt xác thực thành công");
    onConfirm();
  };

  return (
    <MyModal
      centered
      width={isMobile ? "95%" : "60%"}
      title="Đơn xác thực"
      open={open}
      customFooter={
        <div>
          <MyButton
            size="sm"
            className={"mr-2 bg-[#ff4d4f]"}
            onClick={handleReject}
          >
            <i className="fa-solid fa-ban mr-1"> </i>Từ chối xác thực
          </MyButton>
          <MyButton
            size="sm"
            className={"bg-[#2a9e2a]"}
            onClick={handleApprove}
          >
            <i className="fa-solid fa-badge-check mr-1 "></i> Phê duyệt xác thực
          </MyButton>
        </div>
      }
      onCancel={onCancel}
    >
      {data && (
        <div className="w-full h-full bg-white">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-[20px] p-3 ">
              <Image
                width={isMobile ? 60 : 100}
                style={{ objectFit: "cover", borderRadius: "20px" }}
                src={data?.avatar}
              />
            </div>
            <div>
              <div className="flex flex-wrap text-xl font-bold ">
                <UserName
                  noNavigate
                  nameClassName="text-[20px] mr-2"
                  usernameClassName="text-[15px] text-gray-500"
                  data={data}
                />
              </div>
              <p className="text-sm inline-block text-gray-500">
                {renderJSXRoleUser(data?.role)}
              </p>
            </div>
          </div>
          <Row>
            <Col md={12} span={24}>
              <div>Ảnh giấy tờ tuỳ thân mặt trước:</div>
              <Image
                height={200}
                style={{ objectFit: "cover", borderRadius: "20px" }}
                src={data?.verified_info.img_front}
              />
            </Col>
            <Col md={12} span={24}>
              <div>Ảnh giấy tờ tuỳ thân mặt sau:</div>
              <Image
                height={200}
                style={{ objectFit: "cover", borderRadius: "20px" }}
                src={data?.verified_info.img_back}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={12} span={24}>
              <div>Video xác thực:</div>
              <Video src={data?.verified_info.vid_portrait} />
            </Col>
            <Col md={12} span={24}>
              <div>
                <span className="font-bold ml-5">Email: </span>
                <span>{data?.email}</span>
              </div>
              <div>
                <span className="font-bold ml-5">Số điện thoại: </span>
                <span>{data?.phone_number}</span>
              </div>
              <div>
                <span className="font-bold ml-5">Ngày sinh: </span>
                <span>{dayjs(data?.date_of_birth).format("DD/MM/YYYY")}</span>
              </div>
              <div>
                <span className="font-bold ml-5">Giới tính: </span>
                <span>{data?.gender == 1 ? "Nữ" : "Nam"}</span>
              </div>
              <div>
                <span className="font-bold ml-5">Địa chỉ: </span>
                <span>{data?.location}</span>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </MyModal>
  );
}

DetailModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
