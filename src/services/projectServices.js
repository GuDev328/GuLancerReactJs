import axiosIns from "../utils/axios";
import { message, Spin } from "antd";
import { omit } from "lodash";

class ProjectServices {
    async createProject(data) {
        const response = await axiosIns.postAuth("/projects/create", data);
        return response;
    }

    async getAllProject(data) {
        const response = await axiosIns.postAuth(
            `/projects/get-all?page=${data.page}&limit=${data.limit}`,
            omit(data, ["page", "limit"])
        );
        return response.data;
    }

    async getAllFields() {
        const response = await axiosIns.getAuth("/fields/");
        return response.data;
    }
    async getAllTechs() {
        const response = await axiosIns.getAuth("/technology/");
        return response.data;
    }

    async getMyProject(data) {
        const response = await axiosIns.post(
            `/projects/get-my-projects?page=${data.page}&limit=${data.limit}`,
            omit(data, ["page", "limit"])
        );
        return response.data;
    }
    async getDetailProject(id) {
        const response = await axiosIns.getAuth(
            `/projects/get-detail-project/${id}`
        );
        return response.data;
    }
}

const projectServices = new ProjectServices();
export default projectServices;
