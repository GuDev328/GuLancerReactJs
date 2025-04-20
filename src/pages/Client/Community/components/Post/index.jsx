import { Avatar, Image, Input } from "antd";
const { TextArea } = Input;
import React, { useEffect, useLayoutEffect } from "react";
import ReadMoreReadLess from "react-read-more-read-less";
import PropTypes from "prop-types";
import { formatDateTime, formatNumber } from "@/utils/common";
import UserName from "@/components/business/UserName";
import MediaPost from "./MediaPost";
import ModalComment from "./ModalComment";
import { timeAgo } from "@/utils/common";
import tweetServices from "@/services/tweetServices";
import  MyButton  from '@/components/core/MyButton';
import { showConfirmModal } from "../../../../../components/core/MyModal";
import { Modal } from "antd";
import { message } from "antd";

const Post = ({ isAdmin =false, post, isShowGroupName = true }) => {
  const [tym, setTym] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);
  const [tyming, setTyming] = React.useState(false);
  const [display, setDisplay] = React.useState(true);

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

  if(!display) return null;

  return (
    <div className="bg-white p-4 rounded-3xl my-1 w-[90%] max-w-[700px]">
      <div className="flex  items-start justify-between">
        <div className="flex items-center">
          <Avatar size={45} src={post?.user?.avatar} />
          {isShowGroupName ? (
            <div className="leading-none ml-2 mt-3">
              <UserName data={post?.user} />
              <p className="text-[14px] mt-1 font-bold">
                {post?.group[0]?.name}
              </p>
            </div>
          ) : (
            <div className="leading-none ml-2 ">
              <UserName data={post?.user} />
            </div>
          )}
        </div>
        <div className="flex mt-2 leading-none">
          <p className="text-[14px] text-gray-500">
            {timeAgo(post?.created_at)}
          </p>
          <i className="text-[20px]  ml-2 fa-solid fa-ellipsis-stroke-vertical"></i>
        </div>
      </div>

      <div className="content-post my-3 text-[16px] px-5 text-justify leading-tight ">
        <ReadMoreReadLess
          charLimit={400}
          readMoreText={<span style={{ color: "#2881E2" }}>Xem thêm</span>}
          readLessText={<span style={{ color: "#2881E2" }}>Thu gọn</span>}
        >
          {post?.content}
        </ReadMoreReadLess>
      </div>
      <MediaPost post={post} />
     {!isAdmin && <div className="text-gray-700 text-[15px] flex justify-between">
        <p>
          {formatNumber(post?.likes)} thích, {formatNumber(post?.views)} lượt
          xem
        </p>
        <p>
          {formatNumber(post?.comment)} bình luận, {formatNumber(post?.retweet)}{" "}
          chia sẻ
        </p>
      </div>}
      <hr className="mt-1" />
      {!isAdmin && <div className="flex mt-2 justify-around">
        <div className=" flex items-center cursor-pointer" onClick={handleTym}>
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
      </div>}

       {isAdmin && <div className="flex mt-2 gap-2 justify-end">
        <MyButton onClick={() => {
          showConfirmModal({
            title: "Xác nhận",
            content: "Bạn có chắc chắn muốn từ chối bài viết này?",
            onOk: async () => {
              const res = await tweetServices.reject(post._id);
              message.success(res.data.message);
              if (res) {
               setDisplay(false);
                Modal.destroyAll();
              }
            },
          });
        }} size="sm" className="bg-black" >Từ chối</MyButton>
        <MyButton onClick={() => {
          showConfirmModal({
            title: "Xác nhận",
            content: "Bạn có chắc chắn muốn kiểm duyệt bài viết này?",
            onOk: async () => {
              const res = await tweetServices.approve(post._id);
              if (res) {
                message.success(res.data.message);
               setDisplay(false);
                Modal.destroyAll();
              }
            },
          });
        }} size="sm">Kiểm duyệt</MyButton>
        </div>}     
      {showComments && !isAdmin && (
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
  isAdmin: PropTypes.bool,
};

export default Post;
