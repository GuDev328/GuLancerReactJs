import {
    Avatar,
    Button,
    Form,
    Modal,
    Input,
    Upload,
    Image,
    message,
} from "antd";
import { useState } from "react";
const { TextArea } = Input;
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Button as Button2 } from "@material-tailwind/react";
import { PlusOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const CreatePostModal = ({ open, setOpen, groupId, groupName }) => {
    const userInfo = useSelector((state) => state.user.userInfo);
    const handleCancel = () => {
        setMediaList([]);
        setOpen(false);
    };
    const [mediaList, setMediaList] = useState([]);

    console.log("mediaList", mediaList);

    const handleUploadChange = ({ fileList }) => {
        const updatedList = fileList.map((file) => {
            if (file.originFileObj) {
                return {
                    ...file,
                    thumbUrl: URL.createObjectURL(file.originFileObj),
                    //type: file.type.startsWith("image/") ? "image" : "video",
                };
            }
            return file;
        });

        //setMediaList([...mediaList, ...updatedList]);

        setMediaList((pre) =>
            Array.from(
                new Map(
                    [...pre, ...updatedList].map((item) => [
                        item.originFileObj.name,
                        item,
                    ])
                ).values()
            )
        );
    };

    const handleRemove = (file) => {
        // Clean up object URL for the removed file
        if (file.thumbUrl) {
            URL.revokeObjectURL(file.thumbUrl);
        }

        const updatedList = mediaList.filter((item) => item.uid !== file.uid);
        setMediaList(updatedList);
    };
    const customIsImageUrl = (file) => {
        // Tùy chỉnh logic kiểm tra, ví dụ kiểm tra đuôi file hoặc content-type
        return (
            file.type.startsWith("image/") ||
            /\.(jpg|jpeg|png|gif)$/i.test(file.thumbUrl)
        );
    };

    const isImage = (file) => {
        const imageTypes = ["image/jpeg", "image/png", "image/gif"];
        return imageTypes.includes(file.type);
    };
    const itemRender = (originNode, file, fileList) => {
        if (isImage(file.originFileObj)) {
            return originNode;
        }
    };
    return (
        <Modal
            open={open}
            width={"50vw"}
            onClose={handleCancel}
            onCancel={handleCancel}
            title={<p className="text-center">Tạo bài viết mới</p>}
            centered
            footer={
                <>
                    <Button2 size="sm" onClick={handleCancel}>
                        Hủy
                    </Button2>
                    <Button2
                        //loading={loading}
                        className="ml-2 text-white bg-main"
                        size="sm"
                        //onClick={handleCreate}
                    >
                        Tạo
                    </Button2>
                </>
            }
        >
            <div className="px-3">
                <div className="flex mb-3 items-center">
                    <Avatar size={45} src={userInfo.avatar} />
                    <div className="leading-none ml-2 font-bold">
                        <p className="text-[16px]">{userInfo.name}</p>
                        <p className="font-semibold">{groupName}</p>
                    </div>
                </div>
                <Form>
                    <Form.Item>
                        <TextArea
                            placeholder="Nhập nội dung bài viết..."
                            className="custom-textarea"
                            style={{
                                border: "none",
                                outline: "none",
                                boxShadow: "none",
                            }}
                            autoSize={{ minRows: 3 }}
                        ></TextArea>
                    </Form.Item>
                </Form>
            </div>

            <Upload
                multiple
                style={{ width: "100%", height: 200 }}
                listType="picture-card"
                fileList={mediaList.filter((file) =>
                    file.type.startsWith("image/")
                )}
                onChange={handleUploadChange}
                itemRender={itemRender}
                onRemove={handleRemove}
                // itemRender={customItemRender}

                isImageUrl={customIsImageUrl}
                beforeUpload={(file) => {
                    const isImageOrVideo =
                        file.type.startsWith("image/") ||
                        file.type.startsWith("video/");
                    if (!isImageOrVideo) {
                        message.error(
                            "Bạn chỉ có thể upload file ảnh hoặc video!"
                        );
                    }
                    return false;
                }}
            >
                <div>
                    <PlusOutlined />
                </div>
            </Upload>
            <div className="flex flex-wrap">
                {mediaList.length > 0 &&
                    mediaList.map((file) => {
                        if (file.type.startsWith("video/")) {
                            return (
                                <div
                                    key={file.uid}
                                    style={{
                                        position: "relative",
                                        margin: "10px",
                                    }}
                                >
                                    <video
                                        width="200px"
                                        height="100px"
                                        controls
                                    >
                                        <source
                                            src={file.thumbUrl}
                                            type={file.type}
                                        />
                                        Your browser does not support the video
                                        tag.
                                    </video>
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: 8,
                                            right: 8,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Button
                                            icon={<DeleteOutlined />}
                                            onClick={() => handleRemove(file)}
                                            style={{
                                                background:
                                                    "rgba(255, 255, 255, 0.8)",
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        }
                    })}
            </div>
        </Modal>
    );
};

CreatePostModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    groupId: PropTypes.string.isRequired,
    groupName: PropTypes.string.isRequired,
};

export default CreatePostModal;
