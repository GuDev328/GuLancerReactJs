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

    async follow(userId) {
        const response = await axiosIns.postAuth(`/users/follow`, { userId });
        return response.data;
    }
    async unfollow(userId) {
        const response = await axiosIns.postAuth(`/users/unfollow`, { userId });
        return response.data;
    }

    async getDetailUser(userId) {
        const response = await axiosIns.getAuth(`/users/profile/${userId}`);
        return response.data;
    }

    async updateProfile(data) {
        const response = await axiosIns.postAuth(`/users/update-me`, data);
        return response;
    }
}

const userServices = new UserServices();
export default userServices;
