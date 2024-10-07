import axiosIns from "../utils/axios";
import { message, Spin } from "antd";
import { omit } from "lodash";
class SearchServices {
    async searchCommunity(data) {
        const response = await axiosIns.getAuth(
            `search/community?key=${data.keySearch}&limit=${data.limit}&page=${data.page}`
        );
        return response.data;
    }
    async searchFreelancer(data) {
        const response = await axiosIns.postAuth(
            `search/freelancer?limit=${data.limit}&page=${data.page}`,
            omit(data, ["limit", "page"])
        );
        return response.data;
    }
}

const searchServices = new SearchServices();
export default searchServices;
