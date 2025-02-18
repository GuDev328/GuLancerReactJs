import React, { useEffect, useState } from "react";
import paymentServices from "../../../services/paymentServices";
import userServices from "../../../services/userServices";
import MyTable from "../../../components/core/MyTable";
import { Tag } from "antd";
import { formatCurrency, formatDateTime } from "../../../utils/common";
import { HistoryAmountTypeEnum } from "../../../constant/user";

export default function HistoryAmount() {
  const [historyAmountsData, setHistoryAmountsData] = useState();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 7,
    totalPage: 1,
    totalRecord: 0,
  });
  const fetchHistoryAmounts = async () => {
    const res = await userServices.getAmoutHistory(pagination);
    const { orders, ...paginationInfo } = res.result;
    setHistoryAmountsData(orders);
    setPagination(paginationInfo);
  };
  useEffect(() => {
    fetchHistoryAmounts();
  }, [pagination.page]);
  const handleChangePage = (page, size) => {
    setPagination((pre) => ({ ...pre, page, limit: size }));
  };
  const tableColums = [
    {
      title: "STT",
      dataIndex: "stt",
      align: "center",
      width: "50px",
      key: "stt",
      render: (text, record, index) =>
        (pagination.page - 1) * pagination.limit + index + 1,
    },

    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (text, record) => {
        const amount = Number(text);
        const isPositive = record.type === 0 || record.type === 1;
        return (
          <span style={{ color: isPositive ? "green" : "red" }}>
            {isPositive ? "+" : "-"} {formatCurrency(amount)}
          </span>
        );
      },
    },
    {
      title: "Thời gian ",
      dataIndex: "created_at",
      width: "200px",
      key: "created_at",
      render: (text, record, index) => formatDateTime(text),
    },

    {
      title: "Loại biến động",
      dataIndex: "type",
      align: "center",
      key: "type",
      render: (type) => {
        switch (type) {
          case HistoryAmountTypeEnum.DEPOSIT:
            return "Nạp tiền";
          case HistoryAmountTypeEnum.FROM_PROJECT:
            return "Nhận từ dự án";
          case HistoryAmountTypeEnum.WITHDRAW:
            return "Rút tiền";
          case HistoryAmountTypeEnum.TO_PROJECT:
            return "Trả lương dự án";
          default:
            return "Không xác định";
        }
      },
    },
  ];
  return (
    <div>
      <MyTable
        data={historyAmountsData}
        columns={tableColums}
        onChangePage={handleChangePage}
        pageInfo={pagination}
      />
    </div>
  );
}
