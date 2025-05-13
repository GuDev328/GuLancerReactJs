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
import MyButton from "@/components/core/MyButton";
import MyModal, {
  showConfirmModal,
} from "../../../../../components/core/MyModal";
import { Modal } from "antd";
import { message } from "antd";
import DotMenuDropdown from "./../../../../../components/core/DotMenuDropdown";
import { useSelector } from "react-redux";
import ShowMoreText from "react-show-more-text";
const Post = ({
  isAdmin = false,
  post,
  isShowGroupName = true,
  reportInfo,
}) => {
  const [tym, setTym] = React.useState(false);
  const [showComments, setShowComments] = React.useState(false);
  const [tyming, setTyming] = React.useState(false);
  const [display, setDisplay] = React.useState(true);
  const [showReportModal, setShowReportModal] = React.useState(false);
  const [reportDescription, setReportDescription] = React.useState("");
  const { userInfo } = useSelector((state) => state.user);
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

  const handleReport = async () => {
    try {
      await tweetServices.report(post._id, reportDescription);

      message.success("Báo cáo thành công!");
      setShowReportModal(false);
      setReportDescription("");
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      message.error("Có lỗi xảy ra khi báo cáo!");
    }
  };

  if (!display) return null;
  const isOwnUser = userInfo?._id === post?.user_id;
  const dotMenuItems =
    isAdmin || isOwnUser
      ? [
          {
            label: (
              <span className="text-red-500">
                <i className="fa-regular mr-2 fa-trash"></i>Xóa
              </span>
            ),
            onClick: () => {
              showConfirmModal({
                title: "Xác nhận",
                content: "Bạn có chắc chắn muốn xoá bài viết này?",
                onOk: async () => {
                  const res = await tweetServices.reject(post._id);
                  message.success("Xoá bài viết thành công");
                  if (res) {
                    setDisplay(false);
                    Modal.destroyAll();
                  }
                },
              });
            },
          },
        ]
      : [
          {
            label: (
              <span className="text-red-500">
                <i className="fa-regular mr-2 fa-bell"></i>Báo cáo bài viết
              </span>
            ),
            onClick: () => {
              setShowReportModal(true);
            },
          },
        ];
  return (
    <div className="bg-white p-4 rounded-3xl my-1 w-[90%] max-w-[700px]">
      {reportInfo && (
        <div className="w-full">
          <UserName data={reportInfo?.user} />
        </div>
      )}
      {reportInfo && (
        <div className="w-full">
          <span className="font-bold mr-2">Báo cáo: </span>
          <span>{reportInfo?.description}</span>
        </div>
      )}
      <div className="flex  items-start justify-between">
        <div className="flex items-center ">
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
          <DotMenuDropdown items={dotMenuItems} />
        </div>
      </div>

      <div className="content-post my-3 text-[16px] px-5 text-justify leading-tight ">
        <ShowMoreText
          lines={3}
          more="Xem thêm"
          less="Thu gọn"
          anchorClass=""
          expanded={false}
          width={0}
        >
          <div style={{ whiteSpace: "pre-line" }}>{post?.content}</div>
        </ShowMoreText>
      </div>
      <MediaPost post={post} />
      {!isAdmin && (
        <div className="text-gray-700 text-[15px] flex justify-between">
          <p>
            {formatNumber(post?.likes)} thích, {formatNumber(post?.views)} lượt
            xem
          </p>
          <p>{formatNumber(post?.comment)} bình luận, </p>
        </div>
      )}
      <hr className="mt-1" />
      {!isAdmin && (
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
        </div>
      )}

      {isAdmin && !reportInfo && (
        <div className="flex mt-2 gap-2 justify-end">
          <MyButton
            onClick={() => {
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
            }}
            size="sm"
            className="bg-black"
          >
            Từ chối
          </MyButton>
          <MyButton
            onClick={() => {
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
            }}
            size="sm"
          >
            Kiểm duyệt
          </MyButton>
        </div>
      )}

      {reportInfo && (
        <div className="flex mt-2 gap-2 justify-end">
          <MyButton
            variant="outlined"
            onClick={() => {
              showConfirmModal({
                title: "Xác nhận",
                content: "Bạn có chắc chắn muốn từ chối đơn báo cáo này?",
                onOk: async () => {
                  const res = await tweetServices.rejectReport(reportInfo.id);
                  message.success(res.data.message);
                  if (res) {
                    setDisplay(false);
                    Modal.destroyAll();
                  }
                },
              });
            }}
            size="sm"
          >
            <i className="fa-solid mr-2 fa-xmark-to-slot"></i> Từ chối báo cáo
          </MyButton>
          <MyButton
            color="red"
            onClick={() => {
              showConfirmModal({
                title: "Xác nhận",
                content: "Bạn có chắc chắn muốn xoá bài viết này?",
                onOk: async () => {
                  const res = await tweetServices.approveReport(reportInfo.id);
                  if (res) {
                    message.success(res.data.message);
                    setDisplay(false);
                    Modal.destroyAll();
                  }
                },
              });
            }}
            size="sm"
          >
            <i className="fa-regular mr-2 fa-trash"></i> Xoá bài viết
          </MyButton>
        </div>
      )}

      {showComments && !isAdmin && (
        <ModalComment
          open={showComments}
          setOpen={setShowComments}
          post={post}
        />
      )}
      {showReportModal && (
        <MyModal
          open={showReportModal}
          title="Báo cáo bài viết"
          onCancel={() => {
            setShowReportModal(false);
            setReportDescription("");
          }}
          onConfirm={handleReport}
        >
          <TextArea
            rows={4}
            placeholder="Nhập mô tả báo cáo..."
            value={reportDescription}
            onChange={(e) => setReportDescription(e.target.value)}
          />
        </MyModal>
      )}
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  isShowGroupName: PropTypes.bool,
  isAdmin: PropTypes.bool,
  reportInfo: PropTypes.object,
};

export default Post;
