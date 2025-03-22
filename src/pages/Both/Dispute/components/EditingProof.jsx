import React from "react";
import PropTypes from "prop-types";
import MyButton from "../../../../components/core/MyButton";
import { CloseOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import MyFormItemInput from "../../../../components/core/MyFormItemInput";
import { Flex } from "antd";
import styled from "styled-components";
import { useEffect } from "react";
import { Upload } from "antd";
import { useState } from "react";
import { message } from "antd";
import { Input } from "antd";
import mediaServices from "../../../../services/mediaServices";
import { useParams } from "react-router-dom";
import projectServices from "../../../../services/projectServices";
import { useQueryClient } from "@tanstack/react-query";
export default function EditingProof({ setIsEditing, proof }) {
  const [mediaList, setMediaList] = useState([]);
  const { dispute_id } = useParams();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  useEffect(() => {
    form.setFieldsValue({
      ...proof,
    });
    const fileList = proof.files.map((file, index) => ({
      uid: `-${index}`,
      name: file.url.split("/").pop(),
      status: "done",
      raw_old: file,
      description: file.description,
      url: file.url,
    }));
    setMediaList(fileList);
  }, [proof]);

  const isImage = (file) => {
    return file.type.startsWith("image/");
  };
  const isVideo = (file) => {
    return file.type.startsWith("video/");
  };

  const handleSubmit = async () => {
    await form.validateFields();
    let resUpload = [];
    if (mediaList && mediaList.length > 0) {
      const uploadPromises = mediaList.map(async (file, index) => {
        const mediaFile = file.originFileObj;
        let response;
        if (file.status === "done") {
          return {
            result: [{ ...file.raw_old }],
            index,
            description: file.description,
          };
        }
        if (isImage(mediaFile)) {
          response = await mediaServices.uploadImage(mediaFile);
        } else if (isVideo(mediaFile)) {
          response = await mediaServices.uploadVideo(mediaFile);
        } else {
          response = await mediaServices.uploadFile(mediaFile);
        }

        return {
          ...response,
          index,
          description: file.description,
        };
      });

      const uploadResults = await Promise.all(uploadPromises);
      resUpload = uploadResults
        .sort((a, b) => a.index - b.index)
        .map((item) => {
          return {
            ...item.result[0],
            description: item.description,
          };
        });
    }
    const formatData = {
      proof: {
        ...form.getFieldsValue(),
        files: resUpload,
      },
    };
    console.log(formatData);
    const res = await projectServices.editDispute(dispute_id, formatData);
    if (res.status === 200) {
      message.success("Cập nhật bằng chứng thành công");
      queryClient.invalidateQueries(["dispute", dispute_id]);
      setIsEditing(false);
    }
  };

  return (
    <Container>
      <div className="text-right text-2xl font-bold">
        <MyButton
          onClick={() => setIsEditing(false)}
          size="sm"
          color="red"
          variant="outlined"
        >
          <CloseOutlined /> Huỷ bỏ chỉnh sửa
        </MyButton>
      </div>

      <Form form={form} className="mt-4">
        <MyFormItemInput
          name="issue_description"
          type="textarea"
          label="Vấn đề"
          form={form}
        />
        <MyFormItemInput
          name="expected_result"
          type="textarea"
          label="Hướng giải quyết mong muốn"
          form={form}
        />
        <Flex>
          <MyFormItemInput
            name="share_proof"
            type="checkbox"
            label="Cho đối phương xem bằng chứng"
            form={form}
          />
          <MyFormItemInput
            name="admin_into_project"
            type="checkbox"
            label="Cho người quản trị xem chi tiết dự án"
            form={form}
          />
        </Flex>

        <div className="text-lg font-bold mt-1 ml-4">Bằng chứng</div>
        <div className={""}>
          <Upload
            multiple
            onChange={(info) => {
              setMediaList(info.fileList);
            }}
            listType="picture-card"
            fileList={mediaList}
            itemRender={(originNode, file, fileList) => {
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  {originNode}
                  <Input
                    placeholder="Nhập thông tin file"
                    style={{ width: 200, marginLeft: 8 }}
                    defaultValue={file.description}
                    onChange={(e) => {
                      file.description = e.target.value;
                    }}
                  />
                </div>
              );
            }}
            beforeUpload={() => false}
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Tải File</div>
            </div>
          </Upload>
        </div>
        <MyButton onClick={handleSubmit} type="primary" htmlType="submit">
          Lưu
        </MyButton>
      </Form>
    </Container>
  );
}

EditingProof.propTypes = {
  setIsEditing: PropTypes.func.isRequired,
  proof: PropTypes.object.isRequired,
};

const Container = styled.div`
  .ant-form-item {
    margin-bottom: 0 !important;
  }
  .ant-upload-list {
    display: flex;
    flex-wrap: wrap;
  }
  .ant-upload-list-item-container {
    min-width: min-content;
    margin: 0px 10px 50px 0px;
  }
  :where(
      .css-dev-only-do-not-override-1yacf91
    ).ant-upload-wrapper.ant-upload-picture-card-wrapper
    .ant-upload-list.ant-upload-list-picture-card
    .ant-upload-list-item,
  :where(
      .css-dev-only-do-not-override-1yacf91
    ).ant-upload-wrapper.ant-upload-picture-circle-wrapper
    .ant-upload-list.ant-upload-list-picture-card
    .ant-upload-list-item,
  :where(
      .css-dev-only-do-not-override-1yacf91
    ).ant-upload-wrapper.ant-upload-picture-card-wrapper
    .ant-upload-list.ant-upload-list-picture-circle
    .ant-upload-list-item,
  :where(
      .css-dev-only-do-not-override-1yacf91
    ).ant-upload-wrapper.ant-upload-picture-circle-wrapper
    .ant-upload-list.ant-upload-list-picture-circle
    .ant-upload-list-item {
    height: 100px;
    width: 100px;
  }
`;
