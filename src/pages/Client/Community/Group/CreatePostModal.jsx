import {
  Avatar,
  Button,
  Form,
  Modal,
  Input,
  Upload,
  Image,
  message,
  Tooltip,
} from "antd";
import { useState } from "react";
const { TextArea } = Input;
import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Button as Button2 } from "@material-tailwind/react";
import { PlusOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { TweetType } from "@/constant/tweet";
import tweetServices from "@/services/tweetServices";
import mediaServices from "@/services/mediaServices";
import { Flex } from "antd";

const CreatePostModal = ({ open, setOpen, groupId, groupName, setPosts }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    setContent("");
    setMediaList([]);
    setUploadMedia(false);
    setOpen(false);
  };
  const [mediaList, setMediaList] = useState([]);
  const [uploadMedia, setUploadMedia] = useState(false);
  const [content, setContent] = useState("");
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

  const handleCreate = async () => {
    if (loading) return;
    setLoading(true);

    // if (!content) {
    //   message.error("Vui lòng nhập nội dung bài viết!");
    //   return;
    // }
    const data = {
      group_id: groupId,
      content,
      medias: [],
      type: TweetType.TWEET,
      parent_id: null,
      mentions: [],
    };
    if (uploadMedia) {
      const images = mediaList
        .filter((item) => isImage(item))
        .map((item) => item.originFileObj);
      const videos = mediaList
        .filter((item) => !isImage(item))
        .map((item) => item.originFileObj);
      if (images.length > 0 && videos.length > 0) {
        const [imagesRes, videosRes] = await Promise.all([
          mediaServices.uploadImage(images),
          Promise.all(
            videos.map((video) => mediaServices.uploadVideoHLS(video))
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
            videos.map((video) => mediaServices.uploadVideoHLS(video))
          ),
        ]);
        data.medias = [...videosRes.map((item) => item?.result[0])];
      }
    }

    const create = await tweetServices.createTweet(data);
    if (create && create.status === 200) {
      handleCancel();
      if (create.data.result) {
        const info = await tweetServices.getPostsByGroup({
          group_id: groupId,
          page: 1,
          limit: 10,
        });
        const myPost = info.result.find(
          (item) => item.user._id === userInfo._id
        );
        if (myPost) {
          setPosts((pre) => [myPost, ...pre]);
        }
      }
      setLoading(false);
      message.success(create.data.message);
    }
  };
  return (
    <Modal
      open={open}
      width={"90%"}
      style={{ maxWidth: "900px" }}
      onClose={handleCancel}
      maskClosable={false}
      onCancel={handleCancel}
      title={<p className="text-center">Tạo bài viết mới</p>}
      centered
      footer={
        <Flex justify="end">
          <Button2 size="sm" onClick={handleCancel}>
            Hủy
          </Button2>
          <Button2
            loading={loading}
            className="ml-2 text-white bg-main"
            size="sm"
            onClick={handleCreate}
          >
            Tạo
          </Button2>
        </Flex>
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

        <TextArea
          placeholder="Nhập nội dung bài viết..."
          className="custom-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            border: "none",
            fontSize: "16px",
            outline: "none",
            boxShadow: "none",
          }}
          autoSize={{ minRows: 3 }}
        ></TextArea>
      </div>
      <div className={uploadMedia ? "" : "hidden"}>
        <Upload
          multiple
          listType="picture-card"
          fileList={mediaList.filter((file) => file.type.startsWith("image/"))}
          onChange={handleUploadChange}
          itemRender={itemRender}
          onRemove={handleRemove}
          // itemRender={customItemRender}

          isImageUrl={customIsImageUrl}
          beforeUpload={(file) => {
            const isImageOrVideo =
              file.type.startsWith("image/") || file.type.startsWith("video/");
            if (!isImageOrVideo) {
              message.error("Bạn chỉ có thể upload file ảnh hoặc video!");
            }
            return false;
          }}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải ảnh/video</div>
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
                    <video width="200px" height="100px" controls>
                      <source src={file.thumbUrl} type={file.type} />
                      Your browser does not support the video tag.
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
                          background: "rgba(255, 255, 255, 0.8)",
                        }}
                      />
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div>

      <div className="p-3 border-2 flex items-center justify-between mt-2 rounded-xl">
        <p className="font-bold">Thêm vào bài viết của bạn</p>
        <div className="text-[22px]">
          <Tooltip title="Ảnh">
            <i
              onClick={() => setUploadMedia(true)}
              className="fad text-[#37944e] fa-image-polaroid"
            ></i>
          </Tooltip>
          <Tooltip title="Video">
            <i
              onClick={() => setUploadMedia(true)}
              className="mx-6 text-[red] fad fa-film-alt"
            ></i>
          </Tooltip>
        </div>
      </div>
    </Modal>
  );
};

CreatePostModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  groupId: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
  setPosts: PropTypes.func.isRequired,
};

export default CreatePostModal;
