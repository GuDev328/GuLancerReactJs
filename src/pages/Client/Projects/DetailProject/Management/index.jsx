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

export default function Management({ projectId }) {
  const overview = useQuery({
    queryKey: ["overview", projectId],
    queryFn: () => projectServices.getOverviewProgress(projectId),
  });
  console.log(overview.data);
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

      render: (text, record) =>
        renderStatusTagPhaseProject(record.currentPhase.status),
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
      render: (text, record) => <div>{formatCurrency(record.escrowed)}</div>,
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
    </div>
  );
}

Management.propTypes = {
  projectId: PropTypes.string.isRequired,
};
