import React from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const UploadImageButton = ({ onChange, className }) => {
    const handleUploadChange = (info) => {
        if (info.file.status === "done") {
            message.success(`${info.file.name} đã upload thành công!`);
            onChange(info.file.response); // Trả về response từ server khi upload thành công
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} upload thất bại.`);
        }
    };

    return (
        <div className={className}>
            <Upload
                name="image" // Đặt tên là "image" để truyền lên API
                action="http://localhost:3030/medias/upload-image" // Thay đường dẫn API thực tế của bạn
                onChange={handleUploadChange}
                showUploadList={false}
                headers={{
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`, // Truyền token vào header
                }}
                listType="picture" // Hiển thị dưới dạng hình ảnh
                maxCount={1} // Chỉ cho phép upload 1 file
                accept="image/*" // Chỉ chấp nhận các định dạng hình ảnh
            >
                <Button
                    className="bg-white rounded-[50%] p-2"
                    icon={
                        <i className="fa-duotone text-main fa-solid fa-pen"></i>
                    }
                ></Button>
            </Upload>
        </div>
    );
};

UploadImageButton.propTypes = {
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default UploadImageButton;
