import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import projectServices from "../../../../../services/projectServices";
import { Col, Row, Spin, Timeline } from "antd";
import { formatCurrency, formatDate } from "./../../../../../utils/common";
import { showConfirmModal } from "../../../../../components/core/MyModal";
import { useState } from "react";
import ChangePlanProgressModal from "./ChangePlanProgressModal";
import MyButton from "./../../../../../components/core/MyButton";
import { data } from "jquery";
import { ProjectStatus } from "../../../../../constant/project";
import { Modal } from "antd";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { message } from "antd";
export default function MyProgress({ reRender }) {
  const { id } = useParams();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [openModalChangeProgress, setOpenModalChageProgress] = useState(false);
  const myProgress = useQuery({
    queryKey: ["myProgress", id],
    queryFn: () => projectServices.getMyProgress(id),
  });
  if (myProgress.isLoading) return <Spin spinning />;

  const handleReadyPhase = () => {
    showConfirmModal({
      title: "Bạn chắc chắn muốn bắt đầu?",
      content: "Giai đoạn sẽ được chuyển sang trạng thái Tiến hành",
      onOk: async () => {
        const res = await projectServices.memberStartPhase(id);
        if (res.status === 200) {
          myProgress.refetch();
          reRender();
        }
        Modal.destroyAll();
      },
    });
  };

  const handleCancelDisputed = () => {
    showConfirmModal({
      title: "Bạn chắc chắn muốn huỷ bỏ tranh chấp?",
      content: "Giai đoạn sẽ được chuyển sang trạng thái Chờ thanh toán",
    });
  };

  const onClickDispute = () => {
    showConfirmModal({
      title: "Bạn chắc chắn muốn tạo tranh chấp?",
      content:
        "Bạn có chắc chắn muốn tạo 1 cuộc tranh chấp. Bạn sẽ được chuyển sang trang tranh chấp.",
      onOk: async () => {
        const data = {
          project_id: id,
          freelancer_id: userInfo._id,
          employer_id: myProgress.data.project_info[0].admin_id,
        };
        const res = await projectServices.createDispute(data);
        console.log(res);
        if (res.status === 200) {
          myProgress.refetch();
          window.open(`/dispute/${res.data.result.insertedId}`, "_blank");
          reRender();
          Modal.destroyAll();
        }
      },
    });
  };

  const handleReportComplete = () => {
    showConfirmModal({
      title: "Bạn chắc chắn muốn báo cáo hoàn thành?",
      content:
        "Hãy chắc chắn bạn đã bàn giao sản phẩm, Giai đoạn sẽ được chuyển sang trạng thái Chờ thanh toán",
      onOk: async () => {
        const res = await projectServices.memberDonePhase(id);
        if (res.status === 200) {
          myProgress.refetch();
          reRender();
        }
        Modal.destroyAll();
      },
    });
  };

  return (
    <div>
      <Row>
        <Col md={12} span={24}>
          <div className="flex items-center">
            <div className="text-[17px] font-bold mb-2">
              Thoả thuận với {myProgress.data.number_of_milestone} lần thanh
              toán tiền
            </div>
            {myProgress.data.project_info[0].status ===
              ProjectStatus.Recruiting && (
              <MyButton
                onClick={() => setOpenModalChageProgress(true)}
                variant="outlined"
                size="sm"
                className={"ml-2 "}
              >
                <i className="mr-2 fa-solid fa-pen-to-square"></i>
                Thay đổi thoả thuận
              </MyButton>
            )}
          </div>
          <Timeline
            items={myProgress.data.milestone_info.map((item, index) => {
              let color, icon, statusText, action, actionOther;

              switch (item.status) {
                case "NOT_READY":
                  color = "gray";
                  icon = (
                    <i className="fa-solid fa-hourglass-start text-gray-500"></i>
                  );
                  statusText = "Chưa sẵn sàng";
                  action = (
                    <div
                      onClick={handleReadyPhase}
                      className="text-main underline cursor-pointer"
                    >
                      Sẵn sàng bắt đầu
                    </div>
                  );
                  break;
                case "PROCESSING":
                  color = "blue";
                  icon = <i className="fa-solid fa-spinner text-blue-500"></i>;
                  statusText = "Đang tiến hành";
                  action = (
                    <div
                      onClick={handleReportComplete}
                      className="text-main underline cursor-pointer"
                    >
                      Báo cáo hoàn thành
                    </div>
                  );
                  break;
                case "PAYING":
                  color = "orange";
                  icon = (
                    <i className="fa-solid fa-money-bill-wave text-orange-500"></i>
                  );
                  statusText = "Chờ thanh toán";
                  action = (
                    <div
                      onClick={onClickDispute}
                      className="text-main underline cursor-pointer"
                    >
                      Báo cáo tranh chấp
                    </div>
                  );
                  break;
                case "COMPLETE":
                  color = "green";
                  icon = (
                    <i className="fa-solid fa-check-circle text-green-500"></i>
                  );
                  statusText = "Hoàn thành";
                  break;
                case "DISPUTED":
                  color = "red";
                  icon = (
                    <i className="fa-solid fa-exclamation-triangle text-red-500"></i>
                  );
                  statusText = "Tranh chấp";
                  action = (
                    <div
                      onClick={handleCancelDisputed}
                      className="text-main underline cursor-pointer"
                    >
                      Huỷ bỏ tranh chấp
                    </div>
                  );
                  actionOther = (
                    <div
                      onClick={() =>
                        window.open(`/dispute/${item.dispute_id}`, "_blank")
                      }
                      className="text-main underline cursor-pointer"
                    >
                      Đi đến tranh chấp
                    </div>
                  );
                  break;
                default:
                  color = "#333";
                  icon = <i className="fa-solid fa-circle text-gray-500"></i>;
                  statusText = "Không xác định";
              }

              return {
                color: color,
                dot: icon,
                children: (
                  <div>
                    <div className="flex items-center">
                      <div className="font-bold">Giai đoạn {item.no}</div>
                      <div
                        className="ml-1 inline-block px-2 text-white text-sm rounded-lg"
                        style={{ backgroundColor: color }}
                      >
                        {statusText}
                      </div>
                    </div>
                    {(item.status === "NOT_READY" ||
                      item.status === "PROCESSING") && (
                      <div>
                        Ngày dự kiến hoàn thành:{" "}
                        {item.day_to_done
                          ? formatDate(item.day_to_done)
                          : "Chưa có"}
                      </div>
                    )}

                    {(item.status === "PAYING" ||
                      item.status === "DISPUTED") && (
                      <div>
                        Ngày hoàn thành:{" "}
                        {item.day_to_done
                          ? formatDate(item.day_to_done)
                          : "Chưa có"}
                      </div>
                    )}

                    {item.status === "COMPLETE" && (
                      <div>
                        Ngày thanh toán:{" "}
                        {item.day_to_payment
                          ? formatDate(item.day_to_payment)
                          : "Chưa có"}
                      </div>
                    )}

                    <div className="font-bold italic">
                      {formatCurrency(item.salary)}
                    </div>
                    {/* {index === myProgress.data.indexCurrentPhase && action} */}
                    {action}
                    {actionOther}
                  </div>
                ),
              };
            })}
          />
        </Col>
        <Col md={12} span={24}>
          <div className="mt-6 text-[16px] font-bold">
            Mức lương thoả thuận: {formatCurrency(myProgress.data.salary)}
          </div>
          <div className="text-[16px] font-bold">
            Ngày dự kiến hoàn thành:{" "}
            {formatDate(myProgress.data.date_to_complete)}
          </div>
        </Col>
      </Row>
      <ChangePlanProgressModal
        data={myProgress.data}
        open={openModalChangeProgress}
        onCancel={() => {
          setOpenModalChageProgress(false);
        }}
        onConfirm={() => {
          setOpenModalChageProgress(false), myProgress.refetch();
        }}
      />
    </div>
  );
}
MyProgress.propTypes = {
  reRender: PropTypes.func.isRequired,
};
