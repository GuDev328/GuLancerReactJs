import axiosIns from "../utils/axios";
import { message, Spin } from "antd";
class GroupServices {
  async getGroups() {
    const response = await axiosIns.get("/groups/my-groups");
    return response.data;
  }

  async createGroup(data) {
    const response = await axiosIns.post("/groups/create", data);
    return response.data;
  }
  async getGroupById(id) {
    const response = await axiosIns.get(`/groups/${id}`);
    return response.data;
  }
  async joinGroup(groupId) {
    const response = await axiosIns.post(`/groups/join-group`, {
      group_id: groupId,
    });
    return response.data;
  }
}

const groupServices = new GroupServices();
export default groupServices;
