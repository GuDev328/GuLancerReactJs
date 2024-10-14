import { Button, Chip } from "@material-tailwind/react";
import { Avatar, Form, Image, Input, Rate, Spin } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MarkdownView from "../../components/utils/MarkdownView";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import userServices from "../../services/userServices";
import SelectTech from "../../components/core/SelectTech";
import SelectFields from "../../components/core/SelectFields";
import MarkdownEditor from "@uiw/react-markdown-editor";

const UserWall = () => {
    const { isMobile } = useSelector((state) => state.screen);
    const { userInfo } = useSelector((state) => state.user);
    const [form] = Form.useForm();
    const [description, setDescription] = React.useState("");
    // const { id } = useParams();
    // const getDetailUser = useQuery({
    //     queryKey: ["getDetailUser", id],
    //     queryFn: () => userServices.getDetailUser(id),
    // });
    // if (getDetailUser.isLoading)
    //     return (
    //         <div className="w-full h-full bg-white">
    //             <Spin spinning={true}></Spin>
    //         </div>
    //     );
    // console.log(getDetailUser.data.result);

    useEffect(() => {
        form.setFieldsValue({
            name: userInfo?.name,
            username: userInfo?.username,
            salary: userInfo?.salary,
            fields: userInfo?.fields_info.map((field) => field.name),
            technologies: userInfo?.technologies_info.map((tech) => tech.name),
            description: userInfo?.description,
        });
        setDescription(userInfo?.description);
    }, [userInfo]);
    return (
        <div className="bg-white">
            <Form form={form}>
                <div className="w-full h-full bg-white">
                    <div className={`w-full relative `}>
                        <Image
                            width={"100vw"}
                            height={"20vh"}
                            style={{ objectFit: "cover" }}
                            src="https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2023/07/anh-bia-dep-10.jpg.webp"
                        />
                        <div className="absolute flex items-center gap-3  bottom-[0] translate-y-1/2 left-[20px]">
                            <div className="bg-white rounded-[20px] p-3 ">
                                <Image
                                    width={isMobile ? 120 : 200}
                                    style={{
                                        objectFit: "cover",
                                        borderRadius: "20px",
                                    }}
                                    src={userInfo?.avatar}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${isMobile ? "ml-[175px]" : "ml-[255px]"}`}
                    >
                        <Form.Item name="name" label="Họ tên">
                            <Input />
                        </Form.Item>

                        <Form.Item name="username" label="Tên người dùng">
                            <Input />
                        </Form.Item>

                        {userInfo?.role === 0 && (
                            <Form.Item name="salary" label="Lương">
                                <Input />
                            </Form.Item>
                        )}

                        <SelectFields required={false} />
                        <SelectTech required={false} />

                        {userInfo.verified === 1 && (
                            <p
                                className="text-[18px]"
                                style={{ color: "#31c740" }}
                            >
                                <i className="fa-light mr-1 fa-ballot-check"></i>
                                Đã xác thực
                            </p>
                        )}
                        {userInfo.verified === 0 && (
                            <div className="flex items-center gap-2">
                                <p
                                    className="text-[18px]"
                                    style={{ color: "#c78631" }}
                                >
                                    <i className="fa-light mr-1 fa-ballot-check"></i>
                                    Chưa xác thực
                                </p>
                                <Button className="bg-main" size="sm">
                                    Xác thực ngay
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="flex  flex-wrap ml-[20px] md:ml-[255px] flex-col md:flex-row-reverse justify-between">
                        <div></div>
                        <div className="justify-start max-w-[650px] ">
                            <div
                                className={`flex flex-col md:flex-row flex-wrap gap-x-3 text-[17px] `}
                            >
                                <div className="flex  items-center gap-2">
                                    <div className="text-xl font-bold">
                                        {userInfo?.star}
                                    </div>
                                    <Rate value={userInfo?.star} />
                                </div>
                                <div className="flex  items-center gap-2">
                                    <i className="fas fa-tasks-alt text-xl"></i>
                                    <div>
                                        {userInfo?.project_done} dự án đã hoàn
                                        thành
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-comment-alt-lines text-xl"></i>
                                    <div>123 đánh giá</div>
                                </div>
                            </div>
                            <div
                                className={`flex flex-col md:flex-row flex-wrap gap-x-3 text-[17px] `}
                            >
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-calendar-edit"></i>
                                    <div>100% Đúng thời gian</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-money-check-alt"></i>
                                    <div>100% Đúng ngân sách</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-vote-yea"></i>
                                    <div> 100% Tỉ lệ chấp nhận dự án</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Form.Item
                        wrapperCol={24}
                        name="description"
                        valuePropName="value"
                    >
                        <MarkdownEditor
                            value={description}
                            minHeight="300px"
                            onChange={(value) => setDescription(value)}
                        />
                    </Form.Item>
                </div>
            </Form>
            <div className="flex my-2 bg-white justify-end mr-[20px]">
                <Button className="mx-3" size="sm" color={"red"}>
                    <i className="fa-duotone fa-solid fa-circle-xmark text-[18px]"></i>{" "}
                    Hủy
                </Button>
                <Button size="sm" color={"blue"}>
                    <i className="fad fa-edit text-[18px]"></i> Lưu
                </Button>
            </div>
        </div>
    );
};

export default UserWall;
