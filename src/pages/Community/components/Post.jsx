import { Avatar, Image, Input } from "antd";
const { TextArea } = Input;
import React, { useEffect } from "react";
import ReadMoreReadLess from "react-read-more-read-less";
import SliderPost from "./SliderPost";
import Comment from "./Comment";
import PropTypes from "prop-types";

import $ from "jquery";
import { formatDateTime, formatNumber } from "../../../utils/common";
import VideoHLS from "./VideoHLS";

const Post = ({ post }) => {
    const [openSlider, setOpenSlider] = React.useState(false);
    const [textComment, setTextComment] = React.useState("");
    const [tym, setTym] = React.useState(false);
    const { medias } = post;
    const imageCount = medias.length;

    const renderMedia = () => {
        if (!medias || medias.length === 0) return null;

        const videoMedias = medias.filter((media) => media.type !== 0);
        const imageMedias = medias.filter((media) => media.type === 0);

        // Only videos
        if (videoMedias.length > 0 && imageMedias.length === 0) {
            return (
                <div className="w-full">
                    {videoMedias.slice(0, 1).map((media, index) => (
                        <div key={index} className="w-full mb-2">
                            <VideoHLS src={media.url} />
                        </div>
                    ))}
                    {videoMedias.length === 2 && (
                        <div key={videoMedias[1].url} className="w-full mb-2">
                            <VideoHLS src={videoMedias[1].url} />
                        </div>
                    )}
                    {videoMedias.length > 2 && (
                        <div className="w-full mb-2 relative">
                            <VideoHLS
                                controlType="none"
                                src={videoMedias[videoMedias.length - 1].url}
                            />
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-white text-xl">
                                +{videoMedias.length - 2}
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        // Only images
        if (imageMedias.length > 0 && videoMedias.length === 0) {
            return (
                <div className="w-full">
                    <div
                        className={`grid ${
                            imageMedias.length > 4
                                ? "grid-cols-2 gap-2"
                                : "grid-cols-2"
                        }`}
                    >
                        {imageMedias.slice(0, 3).map((media, index) => (
                            <div key={index} className="w-full mb-2 relative">
                                <Image
                                    src={media.url}
                                    alt={`Image ${index}`}
                                    style={{
                                        objectFit: "cover",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    preview={true}
                                />
                            </div>
                        ))}
                        {imageMedias.length === 4 && (
                            <div className="w-full mb-2 relative">
                                <Image
                                    src={imageMedias[3].url}
                                    style={{
                                        objectFit: "cover",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    preview={true}
                                />
                            </div>
                        )}
                        {imageMedias.length > 4 && (
                            <div className="w-full mb-2 relative">
                                <Image
                                    src={imageMedias[3].url}
                                    style={{
                                        objectFit: "cover",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    preview={true}
                                />
                                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-white text-xl">
                                    +{imageMedias.length - 4}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        // 1 image and 1 video
        if (imageMedias.length === 1 && videoMedias.length === 1) {
            return (
                <div className="w-full">
                    <div className="w-full mb-2">
                        <VideoHLS src={videoMedias[0].url} />
                    </div>
                    <div className="w-full mb-2">
                        <Image
                            src={imageMedias[0].url}
                            alt="Single Image"
                            style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "auto",
                            }}
                            preview={true}
                        />
                    </div>
                </div>
            );
        }

        // Multiple videos and images
        if (videoMedias.length > 0 && imageMedias.length > 0) {
            return (
                <div className="w-full">
                    <div className="w-full mb-2">
                        <VideoHLS src={videoMedias[0].url} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {imageMedias.slice(0, 2).map((media, index) => (
                            <div key={index} className="w-full mb-2 relative">
                                <Image
                                    src={media.url}
                                    alt={`Image ${index}`}
                                    style={{
                                        objectFit: "cover",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    preview={true}
                                />
                            </div>
                        ))}
                        {imageMedias.length > 2 && (
                            <div className="w-full mb-2 relative">
                                <Image
                                    src={
                                        imageMedias[imageMedias.length - 1].url
                                    }
                                    alt={`Image ${imageMedias.length - 1}`}
                                    style={{
                                        objectFit: "cover",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    preview={true}
                                />
                                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-white text-xl">
                                    +{imageMedias.length - 2}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="bg-white p-4 rounded-3xl my-3 w-[90%] max-w-[700px]">
            <div className="flex  items-start justify-between">
                <div className="flex items-center">
                    <Avatar size={45} src={post?.user?.avatar} />
                    <div className="leading-none ml-2 mt-3">
                        <p className="text-[16px]">{post?.user?.name}</p>
                        <p className="text-[14px] font-bold">
                            {post?.group[0]?.name}
                        </p>
                    </div>
                </div>
                <div className="flex mt-2 leading-none">
                    <p className="text-[14px] text-gray-500">
                        {formatDateTime(post?.created_at)}
                    </p>
                    <i className="text-[25px] ml-2 fa-solid fa-ellipsis-stroke-vertical"></i>
                </div>
            </div>

            <div className="content-post my-3 text-[16px] px-5 text-justify leading-tight ">
                <ReadMoreReadLess
                    charLimit={400}
                    readMoreText={
                        <span style={{ color: "#2881E2" }}>Xem thêm</span>
                    }
                    readLessText={
                        <span style={{ color: "#2881E2" }}>Thu gọn</span>
                    }
                >
                    {post?.content}
                </ReadMoreReadLess>
            </div>
            {renderMedia()}
            {/* <div className="flex images-post gap-1 relative flex-wrap ">
                <div className="w-[49%] relative">
                    <Image width={"100%"} src="/3.JPG" preview={true} />
                    <div
                        onClick={() => setOpenSlider(true)}
                        className="cursor-pointer absolute text-[50px] content-center text-white text-center top-0 w-full h-full bg-blue-gray-800 opacity-80"
                    >
                        +5
                    </div>
                </div>
            </div> */}
            <div className="text-gray-700 text-[15px] flex justify-between">
                <p>
                    {formatNumber(post?.likes)} thích,{" "}
                    {formatNumber(post?.views)} lượt xem
                </p>
                <p>
                    {formatNumber(post?.comment)} bình luận,{" "}
                    {formatNumber(post?.retweet)} chia sẻ
                </p>
            </div>
            <hr className="mt-1" />
            <div className="flex mt-2 justify-around">
                <div
                    className=" flex items-center cursor-pointer"
                    onClick={() => setTym(!tym)}
                >
                    <i
                        className={`${
                            tym ? "fa-duotone text-main" : "fa-regular"
                        } fa-thumbs-up text-[25px] mr-2`}
                    ></i>
                    <p className={`${tym ? " text-main" : ""} `}>Thích</p>
                </div>
                <div className="flex">
                    <i className="text-[25px] mr-2 fa-duotone fa-comment-captions"></i>
                    <p>Bình luận</p>
                </div>
                <div className="flex">
                    <i className="text-[25px] mr-2 fa-duotone fa-share-from-square"></i>
                    <p>Chia sẻ</p>
                </div>
            </div>
            <hr className="mt-1" />
            <div className="">
                {/* <Comment /> */}
                <div className="flex">
                    <Avatar size={40} className="mr-1" />
                    <div className="relative w-full bg-[#eff2f5] rounded-3xl ">
                        <TextArea
                            value={textComment}
                            onChange={(e) => setTextComment(e.target.value)}
                            autoSize={{ minRows: 1, maxRows: 100 }}
                            placeholder="Viết bình luận..."
                            className={`bg-[#eff2f5] py-2 `}
                            variant="borderless"
                        />
                        <div className="absolute right-0 top-1 ml-2 media-comment w-[100px]   px-3 text-[20px]">
                            <div className="">
                                <i className="fa-light  fa-face-smile"></i>
                                <i className="fa-light fa-image mx-2"></i>
                                <i
                                    className={`${
                                        textComment.length > 0
                                            ? "text-main"
                                            : ""
                                    } fa-duotone fa-paper-plane-top`}
                                ></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SliderPost open={openSlider} setOpen={setOpenSlider} />
        </div>
    );
};

Post.propTypes = {
    post: PropTypes.object.isRequired,
};

export default Post;
