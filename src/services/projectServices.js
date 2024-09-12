import axiosIns from "../utils/axios";
import { message, Spin } from "antd";
class ProjectServices {
    async createProject(data) {
        const response = await axiosIns.postAuth("/projects/create", data);
        return response;
    }
    async getAllFields() {
        const response = await axiosIns.getAuth("/fields/");
        return response.data;
    }
    async getAllTechs() {
        const response = await axiosIns.getAuth("/technology/");
        return response.data;
    }
}

const projectServices = new ProjectServices();
export default projectServices;
