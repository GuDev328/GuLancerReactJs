import axiosIns from "../utils/axios";
import { message, Spin } from "antd";
import { omit } from "lodash";

class TaskServices {
    async createTask(data) {
        const response = await axiosIns.postAuth("/tasks/create", data);
        return response;
    }
    async updateTask(data) {
        const response = await axiosIns.postAuth("/tasks/update", data);
        return response;
    }

    async changeStatusTask(data) {
        const response = await axiosIns.postAuth("/tasks/change-status", data);
        return response;
    }

    async getAllTask(data) {
        const response = await axiosIns.postAuth(
            `/tasks/get-all?page=${data.page}&limit=${data.limit}`,
            omit(data, ["page", "limit"])
        );
        return response.data;
    }

    async getDetailTask(id) {
        const response = await axiosIns.getAuth(`/tasks/${id}`);
        return response.data;
    }
}

const taskServices = new TaskServices();
export default taskServices;
