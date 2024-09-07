import { Avatar, Image, Input } from "antd";
const { TextArea } = Input;
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import socket from "@/utils/socket";
import { TweetType } from "@/constant/tweet";
import tweetServices from "../../../../services/tweetServices";

const ControlComment = ({ post, setListComment }) => {
    const [textComment, setTextComment] = React.useState("");
    const userInfo = useSelector((state) => state.user.userInfo);
    const [isOpenEmojiPicker, setIsOpenEmojiPicker] = React.useState(false);

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            socket.auth = {
                access_token: localStorage.getItem("accessToken"),
            };
            socket.connect();
            socket.emit("joinRoomComment", post._id);
            socket.on("commentUpdated", (comment) => {
                post.comment++;
                setListComment((pre) => [comment, ...pre]);
            });
            socket.on("disconnect", () => {
                //console.log("socket disconnected");
            });
            socket.on("connect_error", (err) => {
                console.log(err);
            });
            return () => {
                socket.emit("leaveRoomComment", post._id);
                socket.disconnect();
                //setIsConnectedSocket(false);
            };
        } else {
            alert("Vui lòng đăng nhập để chat");
            window.location.href = "/";
        }

        return () => {
            socket.emit("leaveRoom", post._id);
        };
    }, [post._id]);

    const handlerSendComment = async () => {
        if (!textComment) return;
        const data = {
            group_id: post.group_id,
            content: textComment.trim(),
            medias: [],
            type: TweetType.COMMENT,
            parent_id: post._id,
            mentions: [],
        };
        const create = await tweetServices.createTweet(data);
        if (create && create.status === 200) {
            setTextComment("");
            socket.emit("newComment", post._id, { ...data, user: [userInfo] });
        }
    };
    return (
        <div className="flex">
            <Avatar src={userInfo.avatar} size={40} className="mr-1" />
            <div className="relative w-full bg-[#eff2f5] rounded-3xl ">
                <TextArea
                    value={textComment}
                    onChange={(e) => setTextComment(e.target.value)}
                    autoSize={{ minRows: 1, maxRows: 100 }}
                    placeholder="Viết bình luận..."
                    className={`bg-[#eff2f5] py-2 pr-[100px] `}
                    variant="borderless"
                />
                <div className="absolute bottom-11 right-0">
                    <EmojiPicker
                        lazyLoadEmojis={true}
                        width={300}
                        height={300}
                        onEmojiClick={(e) =>
                            setTextComment((prev) => prev + e.emoji)
                        }
                        searchDisabled
                        skinTonesDisabled
                        open={isOpenEmojiPicker}
                    />
                </div>
                <div className="absolute right-0 top-1 ml-2 media-comment w-[100px]   px-3 text-[20px]">
                    <div className="">
                        <i
                            onClick={() =>
                                setIsOpenEmojiPicker(!isOpenEmojiPicker)
                            }
                            className="fa-light  fa-face-smile"
                        ></i>
                        <i className="fa-light fa-image mx-2"></i>
                        <i
                            onClick={handlerSendComment}
                            className={`${
                                textComment.length > 0 ? "text-main" : ""
                            } fa-duotone fa-paper-plane-top`}
                        ></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

ControlComment.propTypes = {
    post: PropTypes.object.isRequired,
    setListComment: PropTypes.func.isRequired,
};

export default ControlComment;
