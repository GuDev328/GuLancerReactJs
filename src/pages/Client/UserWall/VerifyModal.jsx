import { Form, Modal, Upload } from "antd";
import PropTypes from "prop-types";

import React from "react";
import MyModal from "@/components/core/MyModal";
import { PlusOutlined } from "@ant-design/icons";
import mediaServices from "./../../../services/mediaServices";
import userServices from "../../../services/userServices";

export default function VerifyModal({ open, onCancel, onConfirm }) {
  const [form] = Form.useForm();
  const handleConfirm = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();

    const [resUploadFront, resUploadBack, resUploadVideo] = await Promise.all([
      mediaServices.uploadImage(values.front[0].originFileObj),
      mediaServices.uploadImage(values.back[0].originFileObj),
      mediaServices.uploadVideo(values.video[0].originFileObj),
    ]);
    const linkImage = {
      img_front: resUploadFront.result[0].url,
      img_back: resUploadBack.result[0].url,
      vid_portrait: resUploadVideo.result[0].url,
    };
    await userServices.requestVerify(linkImage);
    onConfirm();
  };

  const handleUploadChange =
    (name) =>
    ({ fileList }) => {
      form.setFieldsValue({ [name]: fileList.length ? fileList : undefined });
    };

  return (
    <MyModal
      open={open}
      onCancel={onCancel}
      onConfirm={handleConfirm}
      title="Xác thực tài khoản"
    >
      <Form form={form}>
        <Form.Item
          required
          rules={[{ required: true, message: "Vui lòng tải ảnh lên" }]}
          label="Ảnh giấy tờ tuỳ thân trước"
          name="front"
        >
          <Upload
            listType="picture-card"
            accept="image/*"
            beforeUpload={() => false}
            onChange={handleUploadChange("front")}
            maxCount={1}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item
          required
          rules={[{ required: true, message: "Vui lòng tải ảnh lên" }]}
          label="Ảnh giấy tờ tuỳ thân sau"
          name="back"
        >
          <Upload
            listType="picture-card"
            accept="image/*"
            beforeUpload={() => false}
            onChange={handleUploadChange("back")}
            maxCount={1}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item
          required
          rules={[{ required: true, message: "Vui lòng tải video lên" }]}
          label="Video chân dung"
          name="video"
        >
          <Upload
            listType="picture-card"
            accept="video/*"
            onChange={handleUploadChange("video")}
            beforeUpload={() => false}
            maxCount={1}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Tải video lên</div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </MyModal>
  );
}

VerifyModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
