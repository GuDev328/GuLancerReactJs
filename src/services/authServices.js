import axiosIns from "../utils/axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import userServices from "./userServices";

class AuthServices {
  async login(email, password) {
    const response = await axiosIns.post("/users/login", {
      email,
      password,
    });

    const { accessToken, refreshToken } = response.data.result;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    const userInfoRes = await userServices.getMe();

    return {
      ...response.data.result,
      user: userInfoRes.data.result,
    };
  }

  async register(data) {
    const response = axiosIns.post("/users/register", data);
    return response;
  }
  async logout() {
    await axiosIns.post("/users/logout", {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    localStorage.setItem("user", "");
  }

  async forgotPassword(email) {
    const response = axiosIns.post("/users/forgot-password", { email });
    return response;
  }
}

const authServices = new AuthServices();
export default authServices;
