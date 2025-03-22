import { toast } from "react-toastify";
import axiosIns from "../utils/axios";
import { message, Spin } from "antd";
class MediaServices {
  async uploadImage(file) {
    const formData = new FormData();

    if (Array.isArray(file)) {
      file.forEach((file) => {
        formData.append("image", file);
      });
    } else {
      formData.append("image", file);
    }
    const response = await axiosIns.post("/medias/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async uploadFile(file) {
    const formData = new FormData();

    if (Array.isArray(file)) {
      file.forEach((file) => {
        formData.append("file", file);
      });
    } else {
      formData.append("file", file);
    }
    const response = await axiosIns.post("/medias/upload-file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async uploadVideoHLS(file) {
    const formData = new FormData();

    if (Array.isArray(file)) {
      file.forEach((file) => {
        formData.append("video", file);
      });
    } else {
      formData.append("video", file);
    }
    const response = await axiosIns.post("/medias/upload-video-hls", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async uploadVideo(file) {
    const formData = new FormData();

    if (Array.isArray(file)) {
      file.forEach((file) => {
        formData.append("video", file);
      });
    } else {
      formData.append("video", file);
    }
    const response = await axiosIns.post("/medias/upload-video", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
}

const mediaServices = new MediaServices();
export default mediaServices;
