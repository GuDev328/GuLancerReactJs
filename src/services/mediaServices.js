import { toast } from "react-toastify";
import axiosIns from "../utils/axios";
import { message, Spin } from "antd";
class MediaServices {
    async uploadImage(file) {
        const formData = new FormData();

        formData.append("image", file);
        const response = await axiosIns.postAuth(
            "/medias/upload-image",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    }
}

const mediaServices = new MediaServices();
export default mediaServices;
