import axiosIns from "../utils/axios";
import { message, Spin } from "antd";
class SearchServices {
    async searchCommunity(data) {
        const response = await axiosIns.getAuth(
            `search/community?key=${data.keySearch}&limit=${data.limit}&page=${data.page}`
        );
        return response.data;
    }
}

const searchServices = new SearchServices();
export default searchServices;
