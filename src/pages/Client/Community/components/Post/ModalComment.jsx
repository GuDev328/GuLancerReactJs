import React from "react";
import Comments from "./Comments";
import { Modal } from "antd";
import PropTypes from "prop-types";
import ControlComments from "./ControlComment";
import { useSelector } from "react-redux";
import { useState } from "react";
import { UserRole } from "../../../../../constant/user";

const ModalComment = ({ post, open, setOpen }) => {
  const isMobile = useSelector((state) => state.screen.isMobile);
  const [listComment, setListComment] = useState([]);
  const userInfo = useSelector((state) => state.user.userInfo);
  return (
    <Modal
      open={open}
      width={isMobile ? "100%" : "70%"}
      footer={
        userInfo?.role === UserRole.ADMIN ? null : (
          <ControlComments post={post} setListComment={setListComment} />
        )
      }
      title={<p>Bài viết của {post.user.name}</p>}
      centered
      onCancel={() => setOpen(false)}
    >
      <Comments
        postId={post._id}
        listComment={listComment}
        setListComment={setListComment}
      />
    </Modal>
  );
};

ModalComment.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

export default ModalComment;
