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

const Post = ({ post, isShowGroupName = true }) => {
    const [openSlider, setOpenSlider] = React.useState(false);
    const [textComment, setTextComment] = React.useState("");
    const [tym, setTym] = React.useState(false);
    const { medias } = post;
    const mediaCount = medias.length;

    const renderMedia = () => {
        if (!medias || medias.length === 0) return null;

        const mediaFiles = medias.slice(0, 4); // Limit to 4 files
        const remainingFilesCount = medias.length - 4; // Count of remaining files

        return (
            <div className="grid grid-cols-2 gap-2">
                {mediaFiles.map((media, index) => {
                    const isSingleInRow =
                        mediaFiles.length % 2 !== 0 &&
                        index === mediaFiles.length - 1;

                    return (
                        <div
                            key={index}
                            className={`relative mb-2 ${
                                isSingleInRow ? "col-span-2" : ""
                            }`}
                        >
                            {media.type === 0 ? (
                                <div className="h-[187px] rounded-lg overflow-hidden">
                                    <Image
                                        src={media.url}
                                        alt={`Image ${index}`}
                                        height={"187px"}
                                        width={"100%"}
                                        style={{ objectFit: "cover" }}
                                        preview={true}
                                    />
                                </div>
                            ) : (
                                <VideoHLS
                                    src={media.url}
                                    controlType={
                                        mediaCount > 4 && index === 3
                                            ? "none"
                                            : "control"
                                    }
                                />
                            )}
                            {index === 3 && remainingFilesCount > 0 && (
                                <div className="absolute top-0 left-0 w-full h-[187px] flex items-center justify-center bg-black bg-opacity-50 text-white text-xl">
                                    +{remainingFilesCount}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="bg-white p-4 rounded-3xl my-3 w-[90%] max-w-[700px]">
            <div className="flex  items-start justify-between">
                <div className="flex items-center">
                    <Avatar size={45} src={post?.user?.avatar} />
                    {isShowGroupName ? (
                        <div className="leading-none ml-2 mt-3">
                            <p className="text-[16px]">{post?.user?.name}</p>
                            <p className="text-[14px] font-bold">
                                {post?.group[0]?.name}
                            </p>
                        </div>
                    ) : (
                        <div className="leading-none ml-2 ">
                            <p className="text-[16px] font-semibold">
                                {post?.user?.name}
                            </p>
                        </div>
                    )}
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
    isShowGroupName: PropTypes.bool,
};

export default Post;
