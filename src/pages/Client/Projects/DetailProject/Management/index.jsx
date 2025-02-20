import React from "react";
import PropTypes from "prop-types";
import MyTable from "../../../../../components/core/MyTable";
import { Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import projectServices from "../../../../../services/projectServices";
import { Spin } from "antd";
import { formatCurrency } from "@/utils/common";
import { Image } from "antd";
import { renderStatusTagPhaseProject } from "../../../../../utils/render";
import { useEffect } from "react";
import { useState } from "react";
import EscrowModal from "./EscrowModal";
import { showConfirmModal } from "../../../../../components/core/MyModal";
import { Modal } from "antd";

export default function Management({ projectId, reRender }) {
  const [recordSelected, setRecordSelected] = useState();
  const [openEscrowModal, setOpenEscrowModal] = useState(false);
  const overview = useQuery({
    queryKey: ["overview", projectId],
    queryFn: () => projectServices.getOverviewProgress(projectId),
  });

  const handlePayForMember = (user_id) => {
    const data = {
      user_id,
      project_id: projectId,
    };
    showConfirmModal({
      title: "Bạn chắc chắn muốn thanh toán?",
      content: "Số tiền đã ký quỹ sẽ được thanh toán cho thành viên",
      onOk: async () => {
        const res = await projectServices.payForMember(data);
        if (res.status === 200) {
          overview.refetch();
          reRender();
        }
        Modal.destroyAll();
      },
    });
  };

  const tableColumns = [
    {
      title: "STT",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Thành viên",
      align: "center",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, record) => (
        <div className="flex items-center">
          <Image
            src={record.user_info[0].avatar}
            width={40}
            className=" rounded-full"
          />
          <div>{record.user_info[0].name}</div>
        </div>
      ),
    },
    {
      title: "Giai đoạn",
      dataIndex: "role",
      align: "center",
      key: "role",
      render: (text, record) => (
        <div>
          Giai đoạn {record.currentPhase.no}/ {record.milestone_info.length}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "email",
      key: "email",
      render: (text, record) => {
        return renderStatusTagPhaseProject(record.currentPhase.status, () =>
          handlePayForMember(record.user_info[0]._id)
        );
      },
    },
    {
      title: "Số tiền giai đoạn hiện tại",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>{formatCurrency(record.currentPhase.salary)}</div>
      ),
    },
    {
      title: "Ký quỹ hiện tại",
      dataIndex: "username",
      key: "username",
      render: (text, record) => (
        <div>
          {formatCurrency(record.escrowed)}{" "}
          <span
            onClick={() => handleOpenModal(record)}
            className="ml-2 underline text-main cursor-pointer"
          >
            Ký quỹ
          </span>
        </div>
      ),
    },
    {
      title: "Đã nhận",
      dataIndex: "username",
      key: "username",
      render: (text, record) => (
        <div>
          {formatCurrency(record.totalPaid) +
            "/ " +
            formatCurrency(record.salary)}
        </div>
      ),
    },
  ];

  const handleOpenModal = (record) => {
    setRecordSelected(record);
    setOpenEscrowModal(true);
  };
  const handleCloseModal = () => {
    setRecordSelected(undefined);
    setOpenEscrowModal(false);
  };

  const handleConfirmModal = () => {
    overview.refetch();
    setRecordSelected(undefined);
    setOpenEscrowModal(true);
  };

  if (overview.isLoading) return <Spin spinning />;
  return (
    <div>
      <div>
        Số tiền đang ký quỹ:{" "}
        <span>{formatCurrency(overview.data.totalEscrowing)}</span>
      </div>
      <div>
        Số tiền đã chi trả:{" "}
        <span>{formatCurrency(overview.data.amountPaid)}</span>
      </div>
      <div>
        Số tiền cần chi trả dự kiến cho toàn dự án:{" "}
        <span>{formatCurrency(overview.data.totalAmountToBePaid)}</span>
      </div>

      <Table
        loading={overview.isLoading}
        scroll={{ x: 1000 }}
        dataSource={overview.data.progressMember}
        columns={tableColumns}
      />
      <EscrowModal
        open={openEscrowModal}
        data={recordSelected}
        onCancel={handleCloseModal}
        onConfirm={handleConfirmModal}
      />
    </div>
  );
}

Management.propTypes = {
  projectId: PropTypes.string.isRequired,
  reRender: PropTypes.func.isRequired,
};
