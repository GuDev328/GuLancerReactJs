import axios from "axios";
import Cookies from "js-cookie";
import * as jwtDecode from "jwt-decode";
import { message } from "antd";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:3030";

const axiosIns = axios.create({
  baseURL: BASE_URL,
});

axiosIns.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "accessToken"
    )}`;
    return config;
  },
  (error) => {
    // Xử lý lỗi request
    return Promise.reject(error);
  }
);

axiosIns.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(error);

    if (originalRequest.url === "/users/refresh-token") {
      return Promise.reject(error);
    }

    if (error.response?.data.message !== "jwt expired") {
      message.error(error.response?.data.message);
    } else {
      await refreshTokenFunc();
      return axiosIns(originalRequest);
    }

    return Promise.reject(error);
  }
);

let isRefreshingToken = false;

export const refreshTokenFunc = async () => {
  if (isRefreshingToken) return;
  try {
    isRefreshingToken = true;
    const refreshToken = localStorage.getItem("refreshToken");
    const res = await axiosIns.post("/users/refresh-token", { refreshToken });
    localStorage.setItem("accessToken", res.data.result.accessToken);
    localStorage.setItem("refreshToken", res.data.result.refreshToken);
    isRefreshingToken = false;
    return res.data.result.accessToken;
  } catch (error) {
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    window.location.href = "/login?jwt=out";
    isRefreshingToken = false;
    console.log(error);
    return null;
  }
};

export default axiosIns;
