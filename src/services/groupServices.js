import axiosIns from "../utils/axios";
import { message, Spin } from "antd";
class GroupServices {
    async getGroups() {
        const response = await axiosIns.getAuth("/groups/my-groups");
        return response.data;
    }
}

const groupServices = new GroupServices();
export default groupServices;
