import axiosIns from "../utils/axios";
import { message, Spin } from "antd";
import { omit } from "lodash";
class PaymentServices {
  async createPayment(data) {
    const response = await axiosIns.post(`/payments/create-payment`, data);
    return response.data;
  }

  async getPaymentOrders(data) {
    const response = await axiosIns.get(
      `/payments/payment-orders?page=${data.page}&limit=${data.limit}`
    );
    return response.data;
  }
}

const paymentServices = new PaymentServices();
export default paymentServices;
