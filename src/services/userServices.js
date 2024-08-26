import axiosIns from "../utils/axios";
import Cookies from "js-cookie";
import * as jwt from "jwt-decode";
import { setUserInfo } from "../stores/slice/user.slice";
import { store } from "../stores";
class UserServices {
    async getMe() {
        const response = await axiosIns.getAuth("/users/get-me", (res) => {
            const user = res.data.result;
            localStorage.setItem("user", JSON.stringify(user));
            store.dispatch(setUserInfo(res.data.result));
        });
        return response;
    }

    async initRole(data) {
        const response = await axiosIns.postAuth(
            "/users/init-role",
            data,
            (res) => {
                const user = res.data.result;
                localStorage.setItem("user", JSON.stringify(user));
                store.dispatch(setUserInfo(res.data.result));
            }
        );
        return response;
    }
}

const userServices = new UserServices();
export default userServices;
