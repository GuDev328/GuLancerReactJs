import axiosIns from "../utils/axios";
import { message, Spin } from "antd";
class GroupServices {
    async getGroups() {
        const response = await axiosIns.getAuth("/groups/my-groups");
        return response.data;
    }

    async createGroup(data) {
        const response = await axiosIns.postAuth("/groups/create", data);
        return response.data;
    }
    async getGroupById(id) {
        const response = await axiosIns.getAuth(`/groups/${id}`);
        return response.data;
    }
}

const groupServices = new GroupServices();
export default groupServices;
