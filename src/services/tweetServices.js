import axiosIns from "../utils/axios";
import { message, Spin } from "antd";
class TweetServices {
    async createTweet(data) {
        const response = await axiosIns.postAuth("/tweets/create", data);
        return response;
    }
    async getNewFeeds(data) {
        const response = await axiosIns.getAuth(
            `tweets/?page=${data.page}&limit=${data.limit}`
        );
        return response.data;
    }
    async getPostsByGroup(data) {
        const response = await axiosIns.getAuth(
            `tweets/group/${data.group_id}?page=${data.page}&limit=${data.limit}`
        );
        return response.data;
    }

    async getComments(data) {
        const response = await axiosIns.getAuth(
            `tweets/tweet/${data.postId}/children?page=${data.page}&limit=${data.limit}&tweet_type=2`
        );
        return response.data;
    }
}

const tweetServices = new TweetServices();
export default tweetServices;
