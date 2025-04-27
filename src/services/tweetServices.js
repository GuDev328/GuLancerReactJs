import axiosIns from "../utils/axios";
import { message, Spin } from "antd";
class TweetServices {
  async createTweet(data) {
    const response = await axiosIns.post("/tweets/create", data);
    return response;
  }
  async getNewFeeds(data) {
    const response = await axiosIns.get(
      `tweets/?page=${data.page}&limit=${data.limit}`
    );
    return response.data;
  }
  async getPostsByGroup(data) {
    const response = await axiosIns.get(
      `tweets/group/${data.group_id}?page=${data.page}&limit=${data.limit}&censor=${true}`
    );
    return response.data;
  }

  async getPostsPendingByGroup(data) {
    const response = await axiosIns.get(
      `tweets/group/${data.group_id}?page=${data.page}&limit=${data.limit}&censor=${false}`
    );
    return response.data;
  }

  async getComments(data) {
    const response = await axiosIns.get(
      `tweets/tweet/${data.postId}/children?page=${data.page}&limit=${data.limit}&tweet_type=2`
    );
    return response.data;
  }

  async like(postId) {
    const response = await axiosIns.post(`tweets/like`, {
      tweet_id: postId,
    });
    return response.data;
  }

  async unlike(postId) {
    const response = await axiosIns.post(`tweets/unlike`, {
      tweet_id: postId,
    });
    return response.data;
  }
  async approve(postId) {
    const response = await axiosIns.put(`tweets/approve/${postId}`);
    return response;
  }
  async reject(postId) {
    const response = await axiosIns.put(`tweets/reject/${postId}`);
    return response;
  }

  async report(postId, description) {
    const response = await axiosIns.post(`tweets/report/${postId}`, { description });
    return response;
  }
  async reportToAdmin(postId, description) {
    const response = await axiosIns.post(`tweets/report-admin/${postId}`, { description });
    return response;
  }

  async getReports(data) {
    const response = await axiosIns.get(`tweets/reports?page=${data.page}&limit=${data.limit}`);
    return response.data;
  }

  async rejectReport(postId) {
    const response = await axiosIns.post(`tweets/reject-report/${postId}`);
    return response;
  }

  async approveReport(postId) {
    const response = await axiosIns.post(`tweets/approve-report/${postId}`);
    return response;
  }

  async monthlyStats({year}) {
    const response = await axiosIns.get("/tweets/monthly-stats", {
      params: { year },
    });
    return response.data;
  }

}

const tweetServices = new TweetServices();
export default tweetServices;
