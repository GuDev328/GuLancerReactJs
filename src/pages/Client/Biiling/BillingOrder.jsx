import React from "react";
import userServices from "../../../services/userServices";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { formatCurrency, formatDateTime } from "../../../utils/common";
import MyButton from "../../../components/core/MyButton";
import { Input } from "@material-tailwind/react";
import { useState } from "react";
import { showConfirmModal } from "../../../components/core/MyModal";
import paymentServices from "../../../services/paymentServices";
import { Modal } from "antd";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { message } from "antd";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MyTable from "./../../../components/core/MyTable";
import { render } from "less";
import { Tag } from "antd";

export default function BillingOrder() {
  const [ordersData, setOrdersData] = useState();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const navigate = useNavigate();
  useEffect(() => {
    if (status) {
      status === "success" && message.success("Nạp tiên thành công!");
      status === "fail" && message.error("Nạp tiên thất bại!");
      navigate(window.location.pathname, { replace: true });
    }
  }, [status]);
  const [amountToDeposit, setAmountToDeposit] = useState(undefined);
  const [toogleDeposit, setToogleDeposit] = useState(false);
  const [amountToWithdraw, setAmountToWithdraw] = useState(undefined);
  const [toogleWithdraw, setToogleWithdraw] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 7,
    totalPage: 1,
    totalRecord: 0,
  });
  const amountInfo = useQuery({
    queryKey: ["getAmoutInfo"],
    queryFn: () => userServices.getAmoutInfo(),
  });

  const fetchOrders = async () => {
    const res = await paymentServices.getPaymentOrders(pagination);
    const { orders, ...paginationInfo } = res.result;
    setOrdersData(orders);
    setPagination(paginationInfo);
  };
  useEffect(() => {
    fetchOrders();
  }, [pagination.page]);
  const handleDeposit = () => {
    if (!toogleDeposit) {
      setToogleDeposit(true);
      return;
    }
    if (toogleDeposit && !Number(amountToDeposit)) {
      setToogleDeposit(false);
      return;
    }

    showConfirmModal({
      title: "Nạp tiền",
      content: "Bạn sẽ được chuyển hướng sang trang thanh toán lúc này.",
      onOk: () => {
        handleCreatePayment();
        setAmountToDeposit(undefined);
        setToogleDeposit(false);
        Modal.destroyAll();
      },
    });
  };

  const handleCreatePayment = async () => {
    const res = await paymentServices.createPayment({
      amount: amountToDeposit,
    });
    window.location.href = res.result;
  };

  const handleWithdraw = () => {
    if (!toogleWithdraw) setToogleWithdraw(true);
    if (toogleWithdraw && !Number(amountToWithdraw)) setToogleWithdraw(false);
  };

  const tableColums = [
    {
      title: "STT",
      dataIndex: "stt",
      align: "center",
      key: "stt",
      render: (text, record, index) =>
        (pagination.page - 1) * pagination.limit + index + 1,
    },
    {
      title: "Mã giao dịch",
      dataIndex: "_id",
      key: "_id",
      render: (text, record, index) => {
        if (record.status === "PENDING") {
          return (
            <a className="underline" href={record.payment_url}>
              {record._id}
            </a>
          );
        }
        return record._id;
      },
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (text, record, index) => formatCurrency(Number(text)),
    },
    {
      title: "Thời gian yêu cầu",
      dataIndex: "created_at",
      key: "created_at",
      render: (text, record, index) => formatDateTime(text),
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      align: "center",
      render: (text, record, index) => (text ? text : "Chưa hoàn thành"),
    },
    {
      title: "Thời gian hoàn thành",
      dataIndex: "vnp_PayDate",
      key: "vnp_PayDate",
      render: (text, record, index) =>
        text ? formatDateTime(text) : "Chưa hoàn thành",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      align: "center",
      key: "status",
      render: (status) => {
        const statusMap = {
          PENDING: { color: "gold", text: "Đang chờ" },
          SUCCESS: { color: "green", text: "Thành công" },
          FAILED: { color: "volcano", text: "Thất bại" },
          CANCELED: { color: "default", text: "Đã hủy" },
        };

        const { color, text } = statusMap[status] || {
          color: "blue",
          text: status,
        };

        return <Tag color={color}>{text}</Tag>;
      },
    },
  ];
  const handleChangePage = (page, size) => {
    setPagination((pre) => ({ ...pre, page, limit: size }));
  };
  if (amountInfo.isLoading) return <Spin spinning />;
  return (
    <div>
      <div>
        <div>
          <div className="text-[19px] font-bold">
            Số dư: <span>{formatCurrency(amountInfo.data.amount)}</span>
          </div>
          {amountInfo.data.escrowing !== null && (
            <div>
              Số tiền đang ký quỹ:{" "}
              <span>{formatCurrency(amountInfo.data.escrowing)}</span>
            </div>
          )}
        </div>
        <div className="flex mt-2">
          {toogleDeposit && (
            <div className="w-[200px] mr-2">
              <Input
                value={amountToDeposit}
                onChange={(e) => setAmountToDeposit(e.target.value)}
                label="Nhập số tiền cần nạp"
              />
            </div>
          )}

          <MyButton onClick={handleDeposit} size="sm" className={"mr-2"}>
            {" "}
            <i className="fa-solid fa-money-bill-transfer"></i> Nạp tiền
          </MyButton>
          {toogleWithdraw && (
            <div className="w-[200px] mr-2">
              <Input
                value={amountToWithdraw}
                onChange={(e) => setAmountToWithdraw(e.target.value)}
                label="Nhập số tiền cần rút"
              />
            </div>
          )}
          <MyButton onClick={handleWithdraw} size="sm" variant="outlined">
            <i className="fa-solid fa-money-from-bracket"></i>Rút tiền
          </MyButton>
        </div>
      </div>
      <div className="my-2 font-semibold text-[18px]">
        Lịch sử nạp, rút tiền
      </div>
      <MyTable
        data={ordersData}
        columns={tableColums}
        onChangePage={handleChangePage}
        pageInfo={pagination}
      />
    </div>
  );
}
