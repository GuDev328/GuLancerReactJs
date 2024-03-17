import axiosIns from "../utils/axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import userServices from "./userServices";

class AuthServices {
    async login(email, password) {
        const response = await axiosIns.post(
            "/users/login",
            { email, password },
            async (res) => {
                const { accessToken, refreshToken } = res.data.result;
                Cookies.set("accessToken", accessToken);
                Cookies.set("refreshToken", refreshToken, { expires: 7 });
            }
        );
        await userServices.getMe();
        return response;
    }

    async register(data) {
        const response = axiosIns.post("/users/register", data);
        return response;
    }
    async logout() {
        await axiosIns.post("/users/logout", {
            refreshToken: Cookies.get("refreshToken"),
        });
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("user");
    }

    async forgotPassword(email) {
        const response = axiosIns.post("/users/forgot-password", { email });
        return response;
    }
}

const authServices = new AuthServices();
export default authServices;
