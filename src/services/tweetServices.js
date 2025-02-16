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
      `tweets/group/${data.group_id}?page=${data.page}&limit=${data.limit}`
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
}

const tweetServices = new TweetServices();
export default tweetServices;
