import React from "react";
import { formatCurrency } from "@/utils/common";
import MyButton from "../../../../components/core/MyButton";
import { Flex } from "antd";
import ResolveModal from "./ResolveModal";
import { DisputeResolveAction } from "../../../../constant/project";
import { useContext } from "react";
import { StatusDisputeContext } from "..";
import { useSelector } from "react-redux";
import { UserRole } from "../../../../constant/user";
import { useParams } from "react-router-dom";
import projectServices from "@/services/projectServices";
import { useQuery } from "@tanstack/react-query";
export default function Resolve() {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState(0);
  const { dispute_id } = useParams();
  const disputeInfo = useQuery({
    queryKey: ["dispute", dispute_id],
    queryFn: () => projectServices.getDispute(dispute_id),
  });

  const userInfo = useSelector((state) => state.user.userInfo);
  const { isDisputeCanceled } = useContext(StatusDisputeContext);
  const handleOpen = (type) => {
    setOpen(true);
    setType(type);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleOk = () => {
    setOpen(false);
  };
  return (
    <div>
      <div>
        Quyết định đưa ra:{" "}
        {disputeInfo?.data?.status === "RESOLVED_PAY_ALL"
          ? "Thanh toán toàn bộ cho Freelancer"
          : disputeInfo?.data?.status === "RESOLVED_PAY_PART"
          ? "Thanh toán một phần, tiếp tục công việc"
          : disputeInfo?.data?.status === "RESOLVED_NOT_PAY"
          ? " Tiếp tục công việc mà chưa thanh toán"
          : "Chưa có quyết định"}
      </div>
      <div>
        Lý do đi đến quyết định:{" "}
        {disputeInfo?.data?.reason_resolve || "Chưa có lý do"}
      </div>
      {userInfo?.role === UserRole.ADMIN && !isDisputeCanceled && (
        <div>
          <div>
            Giai đoạn: {4}/ {5}
          </div>
          <div>
            Số tiền đã nhận: {formatCurrency(100000)}/{" "}
            {formatCurrency(10000000)}
          </div>
          <div>Số tiền tranh chấp: {formatCurrency(100000)}</div>
          <div>Hướng giải quyết:</div>
          <Flex gap={10}>
            <MyButton onClick={() => handleOpen(DisputeResolveAction.PayAll)}>
              Thanh toán toàn bộ cho Freelancer
            </MyButton>
            <MyButton onClick={() => handleOpen(DisputeResolveAction.PayPart)}>
              Thanh toán một phần, tiếp tục công việc
            </MyButton>
            <MyButton
              variant="outlined"
              onClick={() => handleOpen(DisputeResolveAction.Continue)}
            >
              Tiếp tục công việc mà chưa thanh toán
            </MyButton>
          </Flex>
          <ResolveModal
            amountTotal={100000}
            open={open}
            setOpen={setOpen}
            type={type}
          />
        </div>
      )}
    </div>
  );
}
