import axiosIns from "../utils/axios";
import { message, Spin } from "antd";
class ConversationServices {
    async getChatUsers(userId, limit, page) {
        const response = await axiosIns.getAuth(
            `/conversations/get-chat-users?limit=${limit}&page=${page}`
        );
        return response.data;
    }

    async getConversation(receiver, limit, page) {
        const response = await axiosIns.getAuth(
            `/conversations/get-conversation/${receiver}?limit=${limit}&page=${page}`
        );
        return response.data;
    }
}

const conversationServices = new ConversationServices();
export default conversationServices;
