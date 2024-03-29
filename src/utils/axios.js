import axios from "axios";
import Cookies from "js-cookie";
import * as jwtDecode from "jwt-decode";

const BASE_URL = "http://localhost:3030";

const axiosN = axios.create({
    baseURL: BASE_URL,
});

axiosN.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] = `Bearer ${Cookies.get(
            "accessToken"
        )}`;
        return config;
    },
    (error) => {
        // Xử lý lỗi request
        return Promise.reject(error);
    }
);
export const refreshTokenFunc = async (refreshToken) => {
    try {
        const res = await axiosN.post("/users/refresh-token", { refreshToken });
        Cookies.set("accessToken", res.data.result.accessToken);
        Cookies.set("refreshToken", res.data.result.refreshToken);
        return res.data.result.accessToken;
    } catch (error) {
        console.log(error);
    }
};

const checkToken = async () => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    if (accessToken && refreshToken) {
        const decodedToken = jwtDecode.jwtDecode(accessToken);
        let date = new Date();
        if (decodedToken.exp < date.getTime() / 1000) {
            await refreshTokenFunc(refreshToken);
        }
    } else {
        return false;
    }
};

class Axios {
    async post(url, data, callback) {
        const response = await axiosN
            .post(url, data)
            .then((res) => {
                if (res.status === 200) {
                    if (typeof callback === "function") {
                        callback(res);
                    }
                    return res;
                }
            })
            .catch((err) => {
                return err.response.data.message;
            });
        return response;
    }

    async postAuth(url, data, callback) {
        await checkToken();
        const response = await axiosN
            .post(url, data)
            .then((res) => {
                if (res.status === 200) {
                    if (typeof callback === "function") {
                        callback(res);
                    }
                    return res;
                }
            })
            .catch((err) => {
                return err.response.data?.message;
            });
        return response;
    }

    async get(url, callback) {
        const response = await axiosN
            .get(url)
            .then((res) => {
                if (res.status === 200) {
                    if (typeof callback === "function") {
                        callback(res);
                    }
                    return res;
                }
            })
            .catch((err) => {
                return err.response.data.message;
            });
        return response;
    }

    async getAuth(url, callback) {
        await checkToken();
        const response = await axiosN
            .get(url)
            .then((res) => {
                if (res.status === 200) {
                    if (typeof callback === "function") {
                        callback(res);
                    }
                    return res;
                }
            })
            .catch((err) => {
                return err.response.data?.message;
            });
        return response;
    }
}

const axiosIns = new Axios();

export default axiosIns;
