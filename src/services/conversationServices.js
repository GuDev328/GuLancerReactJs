import axiosIns from "../utils/axios";
import { message, Spin } from "antd";
class ConversationServices {
  async getChatUsers() {
    const response = await axiosIns.get(`/conversations/get-chat-users`);
    return response.data;
  }
  async addNewConversation(user_id) {
    const response = await axiosIns.post(
      `/conversations/add-new-conversation`,
      { user_id }
    );
    return response;
  }

  async getConversation(receiver, limit, page) {
    const response = await axiosIns.get(
      `/conversations/get-conversation/${receiver}?limit=${limit}&page=${page}`
    );
    return response.data;
  }

  async getProjectConversation(receiver, limit, page) {
    const response = await axiosIns.get(
      `/conversations/get-project-conversation/${receiver}?limit=${limit}&page=${page}`
    );
    return response.data;
  }
}

const conversationServices = new ConversationServices();
export default conversationServices;
