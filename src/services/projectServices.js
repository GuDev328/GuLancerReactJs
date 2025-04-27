import axiosIns from "../utils/axios";
import { message, Spin } from "antd";
import { omit } from "lodash";

class ProjectServices {
  async createProject(data) {
    const response = await axiosIns.post("/projects/create", data);
    return response;
  }

  async updateProject(data) {
    const response = await axiosIns.put(`/projects/update`, data);
    return response;
  }

  async deleteProject(id) {
    const response = await axiosIns.delete(`/projects/${id}`);
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
    const response = await axiosIns.post("/projects/apply-invite", data);
    return response;
  }

  async editApplyProject(data){
    const response = await axiosIns.post("/projects/edit-apply-invite", data);
    return response;
  }

  async getApplyInvite(data) {
    const response = await axiosIns.post(`/projects/get-apply-invite`, data);
    return response.data;
  }

  async getDetailApply(id) {
    const response = await axiosIns.get(`/projects/detail-apply-invite/${id}`);
    return response.data.result;
  }

  async getMyProgress(project_id) {
    const response = await axiosIns.get(`/projects/my-progress/${project_id}`);
    return response.data.result;
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

  async memberStartPhase(project_id) {
    const response = await axiosIns.post("/projects/member-start-phase", {
      project_id,
    });
    return response;
  }

  async memberDonePhase(project_id) {
    const response = await axiosIns.post("/projects/member-done-phase", {
      project_id,
    });
    return response;
  }

  async payForMember(data) {
    const response = await axiosIns.post("/projects/pay-for-member", data);
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

  async createDispute(data) {
    const response = await axiosIns.post("/disputes/", data);
    return response;
  }

  async getDispute(dispute_id) {
    const response = await axiosIns.get(`/disputes/${dispute_id}`);
    return response.data.result;
  }

  async editDispute(dispute_id, data) {
    const response = await axiosIns.put(`/disputes/${dispute_id}`, data);
    return response;
  }
  async changeStatusDispute(dispute_id, status) {
    const response = await axiosIns.put(`/disputes/${dispute_id}/status`, {
      status,
    });
    return response;
  }

  async cancelDispute(dispute_id) {
    const response = await axiosIns.put(`/disputes/${dispute_id}/cancel`, );
    return response;
  }

  async resolvePayAllDispute(dispute_id, data) {
    const response = await axiosIns.post(
      `/disputes/${dispute_id}/pay-all`,
      data
    );
    return response;
  }
  async resolvePayPartDispute(dispute_id, data) {
    const response = await axiosIns.post(
      `/disputes/${dispute_id}/pay-part`,
      data
    );
    return response;
  }
  async resolveNotPayDispute(dispute_id, data) {
    const response = await axiosIns.post(
      `/disputes/${dispute_id}/not-pay`,
      data
    );
  }

  async getListApply({page, limit}) {
    const response = await axiosIns.get("/projects/list-apply" + `?page=${page}&limit=${limit}`);
    return response.data;
  }
  async getListInvite({page, limit}) {
    const response = await axiosIns.get("/projects/list-invite" + `?page=${page}&limit=${limit}`);
    return response.data;
  }

  async getListProjectRecruitingController() {
    const response = await axiosIns.get("/projects/list-project-recruiting" );
    return response.data;
  }

  async statistics() {
    const response = await axiosIns.get("/projects/statistics");
    return response.data;
  }
  async statisticsByYear({year}) {
    const response = await axiosIns.get("/projects/statistics-by-year", {
      params: { year },
    });
    return response.data;
  }
  async statisticsByTechnology() {
    const response = await axiosIns.get("/projects/statistics/technologies");
    return response.data;
  }
  async statisticsByField() {
    const response = await axiosIns.get("/projects/statistics/fields");
    return response.data;
  }
}

const projectServices = new ProjectServices();
export default projectServices;
