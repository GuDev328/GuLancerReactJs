import { Button, Chip } from "@material-tailwind/react";
import { Avatar, Form, Image, Input, Rate, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MarkdownView from "../../components/utils/MarkdownView";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import userServices from "../../services/userServices";
import SelectTech from "@/components/business/select/SelectTech";
import SelectFields from "@/components/business/select/SelectFields";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useNavigate } from "react-router-dom";
import UploadImageButton from "../../components/core/UploadImage";
import MyDatePicker from "../../components/core/MyDatePicker";
import dayjs from "dayjs";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../stores/slice/user.slice";
const UserWall = () => {
  const { isMobile } = useSelector((state) => state.screen);
  const { userInfo } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const [description, setDescription] = React.useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [coverPhoto, setCoverPhoto] = useState(userInfo?.cover_photo);
  const [avatar, setAvatar] = useState(userInfo?.avatar);
  const dispatch = useDispatch();
  const handleSave = async () => {
    await form.validateFields();
    const dataForm = form.getFieldsValue();
    const data = {
      ...dataForm,
      cover_photo: coverPhoto,
      avatar: avatar,
    };
    console.log(data);
    const update = await userServices.updateProfile(data);
    if (update.status === 200) {
      message.success("Cập nhật thành công");
      const detailUser = await userServices.getMe();
      navigate(`/profile/${id}`);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      name: userInfo?.name,
      username: userInfo?.username,
      phone_number: userInfo?.phone_number,
      date_of_birth: userInfo?.date_of_birth
        ? dayjs(userInfo?.date_of_birth)
        : null,
      bio: userInfo?.bio,
      salary: userInfo?.salary,
      fields: userInfo?.fields_info?.map((field) => field.name) || [],
      technologies: userInfo?.technologies_info?.map((tech) => tech.name) || [],
      description: userInfo?.description,
    });
    setDescription(userInfo?.description);
  }, [userInfo]);

  const handleCoverPhotoChange = (value) => {
    setCoverPhoto(value.result[0].url);
  };
  const handleAvatarChange = (value) => {
    setAvatar(value.result[0].url);
  };
  return (
    <div className="bg-white">
      <Form
        className="mr-5"
        labelAlign="left"
        labelCol={{ span: 4 }}
        form={form}
      >
        <div className="w-full h-full bg-white">
          <div className={`w-full relative `}>
            <div>
              <Image
                width={"100vw"}
                height={"20vh"}
                style={{ objectFit: "cover" }}
                src={coverPhoto}
              />
              <UploadImageButton
                className="absolute z-20 top-[20px] right-[30px]"
                onChange={handleCoverPhotoChange}
              />
            </div>
            <div className="absolute flex items-center gap-3  bottom-[0] translate-y-1/2 left-[20px]">
              <div className="bg-white rounded-[20px] p-3 ">
                <Image
                  width={isMobile ? 120 : 200}
                  height={isMobile ? 120 : 200}
                  style={{
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                  src={avatar}
                />
                <UploadImageButton
                  className="absolute z-20 top-[20px] right-[20px]"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>
          </div>
          <div className={`${isMobile ? "ml-[20px] mt-[60px]" : "ml-[255px]"}`}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Họ tên không được để trống",
                },
              ]}
              name="name"
              label="Họ tên"
            >
              <Input />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Tên người dùng không được để trống",
                },
              ]}
              name="username"
              label="Tên người dùng"
            >
              <Input />
            </Form.Item>

            <Form.Item name="phone_number" label="Số điện thoại">
              <Input />
            </Form.Item>
            <Form.Item name="date_of_birth" label="Ngày sinh">
              <MyDatePicker />
            </Form.Item>
            <Form.Item wrapperCol={24} name="bio" label="Bio">
              <Input.TextArea />
            </Form.Item>
            {userInfo?.role === 0 && (
              <Form.Item name="salary" label="Lương">
                <Input />
              </Form.Item>
            )}
            {userInfo?.role === 0 && (
              <>
                <SelectFields required={false} />

                <SelectTech required={false} />
              </>
            )}

            {userInfo.verified === 1 && (
              <p className="text-[18px]" style={{ color: "#31c740" }}>
                <i className="fa-light mr-1 fa-ballot-check"></i>
                Đã xác thực
              </p>
            )}
            {/* {userInfo.verified === 0 && (
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
                        )} */}
          </div>

          <Form.Item wrapperCol={24} name="description" valuePropName="value">
            <MarkdownEditor
              value={description}
              minHeight="300px"
              onChange={(value) => setDescription(value)}
            />
          </Form.Item>
        </div>
      </Form>
      <div className="flex my-2 bg-white justify-end mr-[20px]">
        <Button
          onClick={() => navigate(`/profile/${id}`)}
          className="mx-3"
          size="sm"
          color={"red"}
        >
          <i className="fa-duotone fa-solid fa-circle-xmark text-[18px]"></i>{" "}
          Hủy
        </Button>
        <Button onClick={handleSave} size="sm" color={"blue"}>
          <i className="fad fa-edit text-[18px]"></i> Lưu
        </Button>
      </div>
    </div>
  );
};

export default UserWall;
