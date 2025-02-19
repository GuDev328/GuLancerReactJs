import axiosIns from "../utils/axios";
import { message, Spin } from "antd";
import { omit } from "lodash";

class ProjectServices {
  async createProject(data) {
    const response = await axiosIns.post("/projects/create", data);
    return response;
  }

  async getAllProject(data) {
    const response = await axiosIns.post(
      `/projects/get-all?page=${data.page}&limit=${data.limit}`,
      omit(data, ["page", "limit"])
    );
    return response.data;
  }

  async getAllFields() {
    const response = await axiosIns.get("/fields/");
    return response.data;
  }
  async getAllTechs() {
    const response = await axiosIns.get("/technology/");
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
    const response = await axiosIns.get(`/projects/get-detail-project/${id}`);
    return response.data;
  }

  async applyProject(data) {
    const response = await axiosIns.post("/projects//apply-invite", data);
    return response;
  }

  async getApplyInvite(data) {
    const response = await axiosIns.post(`/projects/get-apply-invite`, data);
    return response.data;
  }

  async getMyProgress(project_id) {
    const response = await axiosIns.get(`/projects/my-progress/${project_id}`);
    return response.data.result[0];
  }

  async editMyProgress(data) {
    const response = await axiosIns.post(`/projects/edit-my-progress`, data);
    return response;
  }

  async acceptApplyInvite(id) {
    const response = await axiosIns.post("/projects/accept-apply-invite", {
      apply_invite_id: id,
    });
    return response;
  }

  async rejectApplyInvite(id) {
    const response = await axiosIns.post("/projects/reject-apply-invite", {
      apply_invite_id: id,
    });
    return response;
  }

  async escrow(data) {
    const response = await axiosIns.post("/projects/escrow", data);
    return response;
  }
  async toProcessing(project_id) {
    const response = await axiosIns.post("/projects/recruiting-to-processing", {
      project_id,
    });
    return response;
  }

  async toRecruiting(data) {
    const response = await axiosIns.post("/projects/to-recruiting", data);
    return response;
  }

  async getMember(id) {
    const response = await axiosIns.get(`/projects/get-member/${id}`);
    return response.data;
  }

  async getMarket() {
    const response = await axiosIns.get("/projects/get-market");
    return response.data;
  }

  async getOverviewProgress(project_id) {
    const response = await axiosIns.get(
      `/projects/overview-progress/${project_id}`
    );
    return response.data.result;
  }
}

const projectServices = new ProjectServices();
export default projectServices;
