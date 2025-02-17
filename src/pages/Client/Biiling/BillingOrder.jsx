import React from "react";
import userServices from "../../../services/userServices";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { formatCurrency } from "../../../utils/common";
import MyButton from "../../../components/core/MyButton";
import { Input } from "@material-tailwind/react";
import { useState } from "react";
import { showConfirmModal } from "../../../components/core/MyModal";
import paymentServices from "../../../services/paymentServices";
import { Modal } from "antd";

export default function BillingOrder() {
  const [amountToDeposit, setAmountToDeposit] = useState(undefined);
  const [toogleDeposit, setToogleDeposit] = useState(false);
  const [amountToWithdraw, setAmountToWithdraw] = useState(undefined);
  const [toogleWithdraw, setToogleWithdraw] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total_page: 1,
    total_record: 0,
  });
  const amountInfo = useQuery({
    queryKey: ["getAmoutInfo"],
    queryFn: () => userServices.getAmoutInfo(),
  });

  const orders = useQuery({
    queryKey: ["getPaymentOrders", pagination.page],
    queryFn: async () => await paymentServices.getPaymentOrders(pagination),

    onSettled: (res) => {
      console.log("onSuccess called with response:", res);
    },
  });

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
    window.open(res.result, "_blank", "noopener,noreferrer");
  };

  const handleWithdraw = () => {
    if (!toogleWithdraw) setToogleWithdraw(true);
    if (toogleWithdraw && !Number(amountToWithdraw)) setToogleWithdraw(false);
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
    </div>
  );
}
