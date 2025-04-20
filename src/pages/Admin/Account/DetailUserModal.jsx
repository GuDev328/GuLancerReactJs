import React, { useEffect, useState } from "react";
import MyModal from "../../../components/core/MyModal";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";
import userServices from "../../../services/userServices";
import { Image, Rate } from "antd";
import { UserRole, UserVerifyStatus } from "../../../constant/user";
import UserName from "@/components/business/UserName";
import { Chip } from "@material-tailwind/react";
import MarkdownView from "@/components/utils/MarkdownView";
import dayjs from "dayjs";
import {
  renderJSXRoleUser,
  renderUserVerifyStatus,
} from "../../../utils/render";

export default function DetailUserModal({ id, open, onCancel, onConfirm }) {
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

  return (
    <MyModal
      width={isMobile ? "95%" : "60%"}
      noFooter
      title="Thông tin tài khoản"
      open={open}
      onCancel={onCancel}
    >
      {data && data.role !== UserRole.ADMIN && (
        <div className="w-full h-full bg-white">
          <div className={`w-full relative `}>
            <Image
              width={"100%"}
              height={"20vh"}
              style={{ objectFit: "cover" }}
              src={data?.cover_photo}
            />
            <div className="absolute flex items-center gap-3  bottom-[0] translate-y-1/2 left-[20px]">
              <div className="bg-white rounded-[20px] p-3 ">
                <Image
                  width={isMobile ? 60 : 100}
                  style={{ objectFit: "cover", borderRadius: "20px" }}
                  src={data?.avatar}
                />
              </div>
            </div>
          </div>
          <div className={`${isMobile ? "ml-[175px]" : "ml-[170px]"}`}>
            <div className="flex flex-wrap text-xl font-bold ">
              <UserName
                noNavigate
                nameClassName="text-[20px] mr-2"
                usernameClassName="text-[15px] text-gray-500"
                data={data}
              />
            </div>
            <p className="text-sm inline-block text-gray-500">
              {renderJSXRoleUser(data.role)}
            </p>

            {renderUserVerifyStatus(data?.verified_info.status)}
          </div>

          <div className="justify-start max-w-[650px] ">
            <div className={`flex flex-col md:flex-row flex-wrap gap-x-3 `}>
              <div className="flex  items-center gap-2">
                <div className="text-[18px] font-bold ml-6">
                  {data?.star.$numberDecimal}
                  <i className="ml-1 fa-solid fa-star text-[#ffcf17]"></i>{" "}
                </div>
              </div>
              <div className="flex  items-center gap-2">
                <i className="fas fa-tasks-alt text-xl"></i>
                <div>{data?.project_done} dự án đã hoàn thành</div>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-comment-alt-lines text-xl"></i>
                <div>123 đánh giá</div>
              </div>
            </div>
          </div>

          {data?.role === UserRole.FREELANCER && (
            <div className="ml-5 mt-2">
              <div className="flex flex-wrap items-center">
                <p className="font-bold m-1">Lĩnh vực công việc: </p>
                {data?.fields_info?.map((field) => (
                  <Chip
                    key={field._id}
                    variant="ghost"
                    className="m-1"
                    value={field?.name}
                  />
                ))}
                {data?.fields?.length === 0 && (
                  <p className="text-gray-500">Chưa có lĩnh vực nào</p>
                )}
              </div>
              <div className="flex flex-wrap items-center">
                <p className="font-bold m-1">Công nghệ sử dụng: </p>
                {data?.technologies_info?.map((tech) => (
                  <Chip
                    key={tech._id}
                    variant="ghost"
                    className="m-1"
                    value={tech?.name}
                  />
                ))}
                {data?.technologies?.length === 0 && (
                  <p className="text-gray-500">Chưa có công nghệ nào</p>
                )}
              </div>
            </div>
          )}
          <div>
            <span className="font-bold ml-5">Email: </span>
            <span>{data.email}</span>
          </div>
          <div>
            <span className="font-bold ml-5">Số điện thoại: </span>
            <span>{data.phone_number}</span>
          </div>
          <div>
            <span className="font-bold ml-5">Ngày sinh: </span>
            <span>{dayjs(data.date_of_birth).format("DD/MM/YYYY")}</span>
          </div>
          <div>
            <span className="font-bold ml-5">Giới tính: </span>
            <span>{data.gender == 1 ? "Nữ" : "Nam"}</span>
          </div>
          <div>
            <span className="font-bold ml-5">Địa chỉ: </span>
            <span>{data?.location}</span>
          </div>
          <MarkdownView data={data?.description} />
        </div>
      )}

      {data && data.role === UserRole.ADMIN && (
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
                {renderJSXRoleUser(data.role)}
              </p>
            </div>
          </div>

          <div>
            <span className="font-bold ml-5">Email: </span>
            <span>{data.email}</span>
          </div>
          <div>
            <span className="font-bold ml-5">Số điện thoại: </span>
            <span>{data.phone_number}</span>
          </div>
          <div>
            <span className="font-bold ml-5">Ngày sinh: </span>
            <span>{dayjs(data.date_of_birth).format("DD/MM/YYYY")}</span>
          </div>
          <div>
            <span className="font-bold ml-5">Giới tính: </span>
            <span>{data.gender == 1 ? "Nữ" : "Nam"}</span>
          </div>
          <div>
            <span className="font-bold ml-5">Địa chỉ: </span>
            <span>{data?.location}</span>
          </div>
        </div>
      )}
    </MyModal>
  );
}

DetailUserModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
