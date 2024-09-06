import React, { useState } from "react";
import { Avatar, Spin } from "antd";
import Comment from "./Comment";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import tweetServices from "../../../../../services/tweetServices";

const Comments = ({ postId, listComment, setListComment }) => {
    const comments = useQuery({
        queryKey: ["getComments", postId, 1, 49],
        queryFn: async () => {
            const response = await tweetServices.getComments({
                postId,
                page: 1,
                limit: 49,
            });
            return response;
        },
    });
    useEffect(() => {
        setListComment(comments.data?.result || []);
    }, [comments.data]);

    if (comments.isLoading) {
        return <Spin spinning={true} />;
    }
    return (
        <div className="min-h-[50vh] max-h-[50vh] overflow-scroll overflow-x-hidden">
            {listComment &&
                listComment.map((comment) => (
                    <Comment key={comment._id} comment={comment} />
                ))}
            {listComment.length === 0 && (
                <p className="text-center py-10">Chưa có bình luận nào</p>
            )}
        </div>
    );
};

Comments.propTypes = {
    postId: PropTypes.string.isRequired,
    listComment: PropTypes.arrayOf(PropTypes.object),
    setListComment: PropTypes.func.isRequired,
};

export default Comments;
