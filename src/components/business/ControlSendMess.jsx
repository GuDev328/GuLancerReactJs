import { Avatar, Image, Input, Upload, Button, message, Spin } from "antd";
const { TextArea } = Input;
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import { TweetType } from "@/constant/tweet";

import { PlusOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

import mediaServices from "@/services/mediaServices";

const ControlSendMess = ({ onSubmit }) => {
    const [value, setValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const userInfo = useSelector((state) => state.user.userInfo);
    const [isOpenEmojiPicker, setIsOpenEmojiPicker] = React.useState(false);
    const [fileList, setFileList] = useState([]);
    const isImage = (file) => {
        const imageTypes = ["image/jpeg", "image/png", "image/gif"];
        return imageTypes.includes(file.type);
    };
    const handlerSendComment = async () => {
        if (!value.trim() && fileList.length === 0) return;

        const data = {
            content: value.trim(),
            medias: [],
        };
        setIsLoading(true);
        console.log("fileList:", fileList);

        if (fileList && fileList.length > 0) {
            const images = fileList
                .filter((item) => isImage(item))
                .map((item) => item.originFileObj);
            const videos = fileList
                .filter((item) => !isImage(item))
                .map((item) => item.originFileObj);
            if (images.length > 0 && videos.length > 0) {
                const [imagesRes, videosRes] = await Promise.all([
                    mediaServices.uploadImage(images),
                    Promise.all(
                        videos.map((video) => mediaServices.uploadVideo(video))
                    ),
                ]);
                data.medias = [
                    ...imagesRes.result.map((item) => item),
                    ...videosRes.map((item) => item?.result[0]),
                ];
            } else if (images.length > 0 || videos.length === 0) {
                const [imagesRes] = await Promise.all([
                    mediaServices.uploadImage(images),
                ]);
                data.medias = [...imagesRes.result.map((item) => item)];
            } else if (images.length === 0 && videos.length > 0) {
                const [videosRes] = await Promise.all([
                    Promise.all(
                        videos.map((video) => mediaServices.uploadVideo(video))
                    ),
                ]);
                data.medias = [...videosRes.map((item) => item?.result[0])];
            }
        }

        onSubmit(data.content, data.medias);
        setValue("");
        setFileList([]);
        setIsLoading(false);
    };

    const beforeUpload = (file) => {
        const isImageOrVideo =
            file.type.startsWith("image/") || file.type.startsWith("video/");
        if (!isImageOrVideo) {
            message.error("Chỉ cho phép upload file ảnh hoặc video!");
            return false;
        }
        return false;
    };

    const handleChange = ({ fileList }) => {
        // if (fileList.length > 1) {
        //     fileList = [fileList[0]];
        // }
        const updatedList = fileList.map((file) => {
            if (file.originFileObj) {
                return {
                    ...file,
                    thumbUrl: URL.createObjectURL(file.originFileObj),
                };
            }
            return file;
        });
        setFileList(updatedList);
    };
    const handleRemove = (file) => {
        if (file.thumbUrl) {
            URL.revokeObjectURL(file.thumbUrl);
        }

        const updatedList = fileList.filter((item) => item.uid !== file.uid);
        setFileList(updatedList);
    };
    return (
        <div className="flex">
            <Avatar src={userInfo.avatar} size={40} className="mr-1" />
            <div className="relative w-full bg-[#eff2f5] rounded-3xl ">
                <TextArea
                    onPressEnter={handlerSendComment}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    autoSize={{ minRows: 1, maxRows: 100 }}
                    placeholder="Nhập nội dung..."
                    className={`bg-[#eff2f5] py-2 pr-[100px] `}
                    variant="borderless"
                />
                <div className="flex flex-wrap">
                    {fileList.length > 0 &&
                        fileList.map((file) => {
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
                                            Your browser does not support the
                                            video tag.
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
                                                onClick={() =>
                                                    handleRemove(file)
                                                }
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
                <Upload
                    listType="picture-card"
                    fileList={fileList.filter((file) =>
                        file.type.startsWith("image/")
                    )}
                    onRemove={handleRemove}
                ></Upload>
                <div className="absolute bottom-11 right-0">
                    <EmojiPicker
                        lazyLoadEmojis={true}
                        width={300}
                        height={300}
                        onEmojiClick={(e) => setValue((prev) => prev + e.emoji)}
                        searchDisabled
                        skinTonesDisabled
                        open={isOpenEmojiPicker}
                    />
                </div>
                <div className="absolute  right-0 top-1 ml-2 media-comment w-[100px]   px-3 text-[20px]">
                    <div className="flex mt-[6px] justify-end">
                        <i
                            onClick={() =>
                                setIsOpenEmojiPicker(!isOpenEmojiPicker)
                            }
                            className="fa-light  fa-face-smile"
                        ></i>

                        <Upload
                            fileList={fileList}
                            beforeUpload={beforeUpload}
                            maxCount={10}
                            multiple
                            showUploadList={false}
                            onChange={handleChange}
                            accept="image/*,video/*"
                            onRemove={handleRemove}
                        >
                            <i className="text-[19px] fa-light fa-image mx-2"></i>
                        </Upload>

                        {isLoading ? (
                            <Spin size="small" spinning={isLoading} />
                        ) : (
                            <i
                                onClick={handlerSendComment}
                                className={`${
                                    value.length > 0 ? "text-main" : ""
                                } fa-duotone fa-paper-plane-top`}
                            ></i>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

ControlSendMess.propTypes = {
    onSubmit: PropTypes.func,
};

export default ControlSendMess;
