import React from "react";
import { Avatar } from "antd";
import PropsType from "prop-types";

const Comment = ({ comment }) => {
    return (
        <div className="flex items-start bg-[#eff2f5] my-1 p-1 rounded-3xl">
            <div className="w-[35px]">
                <Avatar src={comment.user[0].avatar} size={35} />
            </div>
            <div className="text-[14px] max-w-[90%] lg:max-w-[700px] mt-2">
                <div className=" leading-4">
                    <span className="font-bold flex-shrink-0 mx-2">
                        {comment.user[0].name}
                    </span>
                    {comment.content}
                </div>

                <div className="mr-2 flex font-bold text-gray-600">
                    <p className="mr-5">Thích</p>
                    <p>Trả lời</p>
                </div>
            </div>
        </div>
    );
};

Comment.propTypes = {
    comment: PropsType.object.isRequired,
};

export default Comment;
