import React from "react";
import PropTypes from "prop-types";
import DotMenuDropdown from "../../../../../components/core/DotMenuDropdown";
import { ProjectStatus } from "../../../../../constant/project";
import { showConfirmModal } from "../../../../../components/core/MyModal";
import projectServices from "../../../../../services/projectServices";
import { useState } from "react";
import RecruitingModal from "./RecruitingModal";
import { Modal } from "antd";

export default function ProjectStatusComponent({
  reRender,
  status,
  isEmployer,
  projectId,
}) {
  const [openModalRecruitingModal, setOpenModalRecruitingModal] =
    useState(false);
  const handleToProcessing = () => {
    showConfirmModal({
      title: "Xác nhận bắt đầu dự án",
      content: (
        <div>
          <div>
            Xác nhận bắt đầu dự án, hãy chắc chắn rằng thoả thuận với các thành
            viên đã được đồng thuận.
          </div>
          <div>
            Các thành viên sẽ không được sửa thoả thuận từ khi dự án bắt đầu.
          </div>
        </div>
      ),
      onOk: async () => {
        await projectServices.toProcessing(projectId);
        reRender();
        Modal.destroyAll();
      },
    });
  };

  const handleRecruiting = () => setOpenModalRecruitingModal(true);

  const renderStatus = () => {
    if (status === ProjectStatus.NotReady) {
      return (
        <div className="flex items-center">
          <p
            className="text-[15px] inline-block p-1 px-3 rounded-2xl"
            style={{ color: "#808080", backgroundColor: "#f0f0f0" }}
          >
            <i className="fa-light mr-1 fa-clock"></i>
            Chưa sẵn sàng
          </p>
          {isEmployer && (
            <DotMenuDropdown
              items={[
                {
                  label: "Tuyển dụng nhân sự",
                  onClick: () => handleRecruiting(),
                },
                { label: "Huỷ dự án", onClick: () => {} },
              ]}
            />
          )}
        </div>
      );
    }
    if (status === ProjectStatus.Recruiting) {
      return (
        <div className="flex items-center">
          <p
            className="text-[15px] inline-block p-1 px-3 rounded-2xl"
            style={{ color: "#007bff", backgroundColor: "#e7f1ff" }}
          >
            <i className="fa-light mr-1 fa-user-plus"></i>
            Đang tuyển dụng
          </p>
          {isEmployer && (
            <DotMenuDropdown
              items={[
                {
                  label: "Bắt đầu dự án",
                  onClick: () => handleToProcessing(),
                },
                { label: "Huỷ dự án", onClick: () => {} },
              ]}
            />
          )}
        </div>
      );
    }
    if (status === ProjectStatus.Processing) {
      return (
        <div>
          <p
            className="text-[15px] inline-block p-1 px-3 rounded-2xl"
            style={{ color: "#17a2b8", backgroundColor: "#e0f7fa" }}
          >
            <i className="fa-light mr-1 fa-spinner"></i>
            Đang thực hiện
          </p>
          {isEmployer && (
            <DotMenuDropdown
              items={[
                { label: "Tạm dừng dự án", onClick: () => {} },
                { label: "Huỷ dự án", onClick: () => {} },
              ]}
            />
          )}
        </div>
      );
    }
    if (status === ProjectStatus.PendingMemberReady) {
      return (
        <div className="flex items-center">
          <p
            className="text-[15px] inline-block p-1 px-3 rounded-2xl"
            style={{ color: "#ffc107", backgroundColor: "#fff3cd" }}
          >
            <i className="fa-solid mr-1 fa-hourglass-half"></i>
            Chờ các thành viên bắt đầu
          </p>
          {isEmployer && (
            <DotMenuDropdown
              items={[
                {
                  label: "Tuyển thêm nhân sự",
                  onClick: () => handleRecruiting(),
                },
                { label: "Huỷ dự án", onClick: () => {} },
              ]}
            />
          )}
        </div>
      );
    }
    if (status === ProjectStatus.Pause) {
      return (
        <div>
          <p
            className="text-[15px] inline-block p-1 px-3 rounded-2xl"
            style={{ color: "#ffc107", backgroundColor: "#fff3cd" }}
          >
            <i className="fa-light mr-1 fa-pause-circle"></i>
            Tạm dừng
          </p>

          {isEmployer && (
            <DotMenuDropdown
              items={[
                { label: "Tiếp tục dự án", onClick: () => {} },
                { label: "Tuyển thêm nhân sự", onClick: () => {} },
                { label: "Huỷ dự án", onClick: () => {} },
              ]}
            />
          )}
        </div>
      );
    }
    if (status === ProjectStatus.Paying) {
      return (
        <div>
          <p
            className="text-[15px] inline-block p-1 px-3 rounded-2xl"
            style={{ color: "#28a745", backgroundColor: "#d4edda" }}
          >
            <i className="fa-light mr-1 fa-money-bill"></i>
            Đang thanh toán
          </p>

          {isEmployer && (
            <DotMenuDropdown
              items={[
                { label: "Xác nhận thanh toán", onClick: () => {} },
                { label: "Huỷ dự án", onClick: () => {} },
              ]}
            />
          )}
        </div>
      );
    }
    if (status === ProjectStatus.Complete) {
      return (
        <p
          className="text-[15px] inline-block p-1 px-3 rounded-2xl"
          style={{ color: "#31c740", backgroundColor: "#dff0d8" }}
        >
          <i className="fa-light mr-1 fa-check-circle"></i>
          Đã hoàn thành
        </p>
      );
    }
    if (status === ProjectStatus.Disputed) {
      return (
        <p
          className="text-[15px] inline-block p-1 px-3 rounded-2xl"
          style={{ color: "#dc3545", backgroundColor: "#f8d7da" }}
        >
          <i className="fa-light mr-1 fa-exclamation-triangle"></i>
          Đang tranh chấp
        </p>
      );
    }
  };
  const handleCloseModal = () => {
    setOpenModalRecruitingModal(false);
  };
  const handleConfirmModal = () => {
    reRender();
    setOpenModalRecruitingModal(false);
  };
  return (
    <div>
      {renderStatus()}
      <RecruitingModal
        project_id={projectId}
        open={openModalRecruitingModal}
        onCancel={handleCloseModal}
        onConfirm={handleConfirmModal}
      />
    </div>
  );
}

ProjectStatusComponent.propTypes = {
  status: PropTypes.string.isRequired,
  reRender: PropTypes.func.isRequired,
  isEmployer: PropTypes.bool.isRequired,
  projectId: PropTypes.string.isRequired,
};
