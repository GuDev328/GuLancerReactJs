import React from "react";
import { Avatar, Image } from "antd";
import PropsType from "prop-types";
import { MediaType } from "@/constant/tweet";
import Video from "@/components/utils/Media/Video";

const Comment = ({ comment }) => {
  return (
    <div className="flex items-start bg-[#eff2f5] my-1 p-1 rounded-3xl">
      <div className="w-[35px]">
        <Avatar src={comment.user.avatar} size={35} />
      </div>
      <div className="text-[14px] max-w-[90%] lg:max-w-[700px] mt-2">
        <div className=" leading-4">
          <span className="font-bold flex-shrink-0 mx-2">
            {comment.user.name}
          </span>
          {comment.content}
        </div>

        {comment.medias.length > 0 &&
          comment.medias[0].type === MediaType.IMAGE && (
            <Image
              className="mt-1"
              src={comment.medias[0].url}
              width={300}
            ></Image>
          )}
        {comment.medias.length > 0 &&
          comment.medias[0].type === MediaType.VIDEO && (
            <div className="mt-1 w-[300px]">
              <Video src={comment.medias[0].url} />
            </div>
          )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropsType.object.isRequired,
};

export default Comment;
