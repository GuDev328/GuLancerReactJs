import axiosIns from "../utils/axios";
import Cookies from "js-cookie";
import * as jwt from "jwt-decode";
import { setUserInfo } from "../stores/slice/user.slice";
import { store } from "../stores";
class UserServices {
  async getMe() {
    const res = await axiosIns.get("/users/get-me");
    const user = res.data.result;
    localStorage.setItem("user", JSON.stringify(user));
    store.dispatch(setUserInfo(res.data.result));
    return res;
  }

  async initRole(data) {
    const res = await axiosIns.post("/users/init-role", data);
    const user = res.data.result;
    localStorage.setItem("user", JSON.stringify(user));
    store.dispatch(setUserInfo(res.data.result));
    return res;
  }

  async follow(userId) {
    const response = await axiosIns.post(`/users/follow`, { userId });
    return response.data;
  }
  async unfollow(userId) {
    const response = await axiosIns.post(`/users/unfollow`, { userId });
    return response.data;
  }

  async getDetailUser(userId) {
    const response = await axiosIns.get(`/users/profile/${userId}`);
    return response.data;
  }

  async deleteUser(id) {
    const response = await axiosIns.post(`/users/delete`, { id });
    return response;
  }
  async updateProfile(data) {
    const response = await axiosIns.post(`/users/update-me`, data);
    return response;
  }
  async blockUser(id) {
    const response = await axiosIns.post(`/users/block`, { id });
    return response;
  }
  async unblockUser(id) {
    const response = await axiosIns.post(`/users/unblock`, { id });
    return response;
  }

  async requestVerify(data) {
    const response = await axiosIns.post(`/users/request-verify`, data);
    return response;
  }
  async approveVerify(userId) {
    const response = await axiosIns.post(`/users/handle-verify`, {
      userId,
      type: "APPROVE",
    });
    return response;
  }
  async rejectVerify(userId) {
    const response = await axiosIns.post(`/users/handle-verify`, {
      userId,
      type: "REJECT",
    });
    return response;
  }

  async getListUser({ page, limit, ...data }) {
    const response = await axiosIns.post(
      `/users/list?page=${page}&limit=${limit}`,
      data
    );
    return response.data;
  }

  async getListRequestVerifyUser({ page, limit, ...data }) {
    const response = await axiosIns.post(
      `/users/list-request-verify?page=${page}&limit=${limit}`,
      data
    );
    return response.data.result;
  }
  async getAmoutInfo() {
    const response = await axiosIns.get(`/users/amount-info`);
    return response.data.result;
  }
  async getAmoutHistory(data) {
    const response = await axiosIns.get(
      `/users/amount-history?page=${data.page}&limit=${data.limit}`
    );
    return response.data;
  }
  async getListDispute({ page, limit, ...data }) {
    const response = await axiosIns.post(
      `/disputes/list?page=${page}&limit=${limit}`,
      data
    );
    return response.data.result;
  }
  
  async registrationStats({ year }) {
    const response = await axiosIns.get("/users/registration-stats", {
      params: { year },
    });
    return response.data;
  }
  
  async overallStats() {
    const response = await axiosIns.get("/users/overall-stats");
    return response.data;
  }
}

const userServices = new UserServices();
export default userServices;
