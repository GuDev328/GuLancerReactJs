import { Avatar, Image, Input } from "antd";
const { TextArea } = Input;
import React, { useEffect } from "react";
import ReadMoreReadLess from "react-read-more-read-less";
import SliderPost from "./SliderPost";
import Comment from "./Comment";
import $ from "jquery";

const Post = () => {
    const [openSlider, setOpenSlider] = React.useState(false);
    const [textComment, setTextComment] = React.useState("");
    const [tym, setTym] = React.useState(false);

    return (
        <div className="bg-white p-4 rounded-3xl my-3 w-[90%] max-w-[700px]">
            <div className="flex  items-start justify-between">
                <div className="flex items-center">
                    <Avatar size={45} />
                    <div className="leading-none ml-2 mt-3">
                        <p className="text-[16px]">Phạm Tiến Đạt</p>
                        <p className="text-[14px] font-bold">
                            {" "}
                            Cộng đồng IT Hà Nội
                        </p>
                    </div>
                </div>
                <div className="flex mt-2 leading-none">
                    <p className="text-[14px] text-gray-500">
                        18/05/2025 8:45 PM
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
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latin professor at Hampden-Sydney College in
                    Virginia, looked up one of the more obscure Latin words,
                    consectetur, from a Lorem Ipsum passage, and going through
                    the cites of the word in classical literature, discovered
                    the undoubtable source. Lorem mpden-Sydney College in
                    Virginia, looked up one of the more obscure Latin words,
                    consectetur, from a Lorem Ipsum passage, and going through
                    the cites of the word in classical literature, discovered
                    the undoubtable source. Lorem
                </ReadMoreReadLess>
            </div>

            <div className="flex images-post gap-1 relative flex-wrap ">
                <div className="w-[49%]">
                    <Image
                        width={"100%"}
                        src="/3.JPG"
                        preview={{
                            src: "/3.JPG",
                        }}
                    />
                </div>
                <div className="w-[49%]">
                    <Image
                        width={"100%"}
                        src="/3.JPG"
                        preview={{
                            src: "/3.JPG",
                        }}
                    />
                </div>
                <div className="w-[49%]">
                    <Image
                        width={"100%"}
                        height={"100%"}
                        src="/3.JPG"
                        preview={{
                            src: "/3.JPG",
                        }}
                    />
                </div>
                <div className="w-[49%] relative">
                    <Image width={"100%"} src="/3.JPG" preview={false} />
                    <div
                        onClick={() => setOpenSlider(true)}
                        className="cursor-pointer absolute text-[50px] content-center text-white text-center top-0 w-full h-full bg-blue-gray-800 opacity-80"
                    >
                        +5
                    </div>
                </div>
            </div>
            <div className="text-gray-700 text-[15px] flex justify-between">
                <p>2,3K lượt thích</p>
                <p>300 bình luận, 7 lượt chia sẻ</p>
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
                <Comment />
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

export default Post;
