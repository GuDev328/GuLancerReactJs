import axiosIns from "../utils/axios";
import { message, Spin } from "antd";
import { omit } from "lodash";

class TaskServices {
  async createTask(data) {
    const response = await axiosIns.post("/tasks/create", data);
    return response;
  }
  async updateTask(data) {
    const response = await axiosIns.post("/tasks/update", data);
    return response;
  }

  async changeStatusTask(data) {
    const response = await axiosIns.post("/tasks/change-status", data);
    return response;
  }

  async getAllTask(data) {
    const response = await axiosIns.post(
      `/tasks/get-all?page=${data.page}&limit=${data.limit}`,
      omit(data, ["page", "limit"])
    );
    return response.data;
  }

  async getDetailTask(id) {
    const response = await axiosIns.get(`/tasks/${id}`);
    return response.data;
  }
}

const taskServices = new TaskServices();
export default taskServices;
