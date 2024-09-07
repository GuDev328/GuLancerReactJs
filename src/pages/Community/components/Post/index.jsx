import { Avatar, Image, Input } from "antd";
const { TextArea } = Input;
import React, { useEffect, useLayoutEffect } from "react";
import ReadMoreReadLess from "react-read-more-read-less";
import PropTypes from "prop-types";
import { formatDateTime, formatNumber } from "@/utils/common";

import MediaPost from "./MediaPost";
import ModalComment from "./ModalComment";
import { timeAgo } from "../../../../utils/common";
import tweetServices from "../../../../services/tweetServices";

const Post = ({ post, isShowGroupName = true }) => {
    const [tym, setTym] = React.useState(false);
    const [showComments, setShowComments] = React.useState(false);
    const [tyming, setTyming] = React.useState(false);

    useEffect(() => {
        setTym(!!post.liked);
    }, [post]);

    const handleTym = async () => {
        if (tyming) return;

        setTyming(true);

        try {
            if (tym) {
                await tweetServices.unlike(post._id);
                setTym(false);
                post.likes--;
            } else {
                await tweetServices.like(post._id);
                setTym(true);
                post.likes++;
            }
        } catch (error) {
            console.error("Có lỗi xảy ra:", error);
        } finally {
            setTyming(false);
        }
    };

    return (
        <div className="bg-white p-4 rounded-3xl my-1 w-[90%] max-w-[700px]">
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
                        {timeAgo(post?.created_at)}
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
            <MediaPost post={post} />
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
                    onClick={handleTym}
                >
                    <i
                        className={`${
                            tym ? "fa-duotone text-[red]" : "fa-light"
                        } fa-circle-heart text-[25px] mr-2`}
                    ></i>
                    <p className={`${tym ? " text-[red]" : ""} `}>Thích</p>
                </div>
                <div
                    onClick={() => setShowComments(true)}
                    className="flex cursor-pointer"
                >
                    <i className="text-[24px] mr-2 fa-regular fa-messages"></i>
                    <p>Bình luận</p>
                </div>
                <div className="flex">
                    <i className="text-[22px] mr-2 fa-light fa-share-from-square"></i>
                    <p>Chia sẻ</p>
                </div>
            </div>
            {showComments && (
                <ModalComment
                    open={showComments}
                    setOpen={setShowComments}
                    post={post}
                />
            )}
        </div>
    );
};

Post.propTypes = {
    post: PropTypes.object.isRequired,
    isShowGroupName: PropTypes.bool,
};

export default Post;
