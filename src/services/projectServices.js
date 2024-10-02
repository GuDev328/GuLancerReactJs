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

    async applyProject(data) {
        const response = await axiosIns.postAuth(
            "/projects//apply-invite",
            data
        );
        return response;
    }

    async getApplyInvite(data) {
        const response = await axiosIns.post(
            `/projects/get-apply-invite`,
            data
        );
        return response.data;
    }

    async acceptApplyInvite(id) {
        const response = await axiosIns.postAuth(
            "/projects/accept-apply-invite",
            { apply_invite_id: id }
        );
        return response;
    }

    async rejectApplyInvite(id) {
        const response = await axiosIns.postAuth(
            "/projects/reject-apply-invite",
            { apply_invite_id: id }
        );
        return response;
    }
}

const projectServices = new ProjectServices();
export default projectServices;
