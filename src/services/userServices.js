import axiosIns from "../utils/axios";
import Cookies from "js-cookie";
import * as jwt from "jwt-decode";

class UserServices {
    async getMe() {
        const response = await axiosIns.getAuth("/users/get-me", (res) => {
            const user = res.data.result;
            localStorage.setItem("user", JSON.stringify(user));
        });
        return response;
    }
}

const userServices = new UserServices();
export default userServices;
