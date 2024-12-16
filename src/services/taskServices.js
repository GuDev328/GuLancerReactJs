import axiosIns from "../utils/axios";
import { message, Spin } from "antd";
import { omit } from "lodash";

class TaskServices {
    async createTask(data) {
        const response = await axiosIns.postAuth("/tasks/create", data);
        return response;
    }

    async getAllTask(data) {
        const response = await axiosIns.postAuth(
            `/tasks/get-all?page=${data.page}&limit=${data.limit}`,
            omit(data, ["page", "limit"])
        );
        return response.data;
    }
}

const taskServices = new TaskServices();
export default taskServices;