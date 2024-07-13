import React, { useState } from "react";
import { Checkbox, Button, Typography, Form, Input } from "antd";
const { Title } = Typography;
const techs = [
    "HTML, CSS, JavaScript",
    "Node.js",
    "React.js",
    "Java",
    "Node.js",
    "Python",
    "Golang",
    // Thêm các mục khác ở đây
];

const fields = [
    "Xây dựng ứng dụng",
    "Xây dựng website",
    "Thiết kế",
    "Trí tuệ nhân tạo",
    "Quản lý tài khoản",
    "Trí tuệ nhân tạo",
    "Quản lý tài khoản",
];

const Filter = () => {
    const [showMoreTech, setShowMoreTech] = useState(false);
    const [showMoreField, setShowMoreField] = useState(false);
    const handleShowMoreTech = () => {
        setShowMoreTech(!showMoreTech);
    };
    const handleShowMoreFiled = () => {
        setShowMoreField(!showMoreField);
    };
    return (
        <div className="my-5 mx-8">
            <div className="rounded-3xl bg-white min-w-[230px] w-[15%] my-3 p-5">
                <p className="text-[23px] font-bold">Kiểu dự án</p>
                <div className="ml-3">
                    <Checkbox>Trả lương theo giờ</Checkbox>
                    <Checkbox>Trả lương theo dự án</Checkbox>
                </div>
            </div>
            <div className="rounded-3xl bg-white min-w-[230px] w-[15%] my-3 p-5">
                <p className="text-[23px] font-bold">Lĩnh vực</p>
                <div className="ml-3">
                    {fields
                        .slice(0, showMoreField ? fields.length : 5)
                        .map((item, index) => (
                            <>
                                <Checkbox key={index}>{item}</Checkbox>
                                <br />
                            </>
                        ))}
                    <Button
                        onClick={handleShowMoreFiled}
                        type="link"
                        style={{ marginTop: 8 }}
                    >
                        {showMoreField ? "Thu gọn" : "Xem thêm"}
                    </Button>
                </div>
            </div>

            <div className="rounded-3xl bg-white min-w-[230px] w-[15%] my-3 p-5">
                <p className="text-[23px] font-bold">Công nghệ</p>
                <div className="ml-3">
                    {techs
                        .slice(0, showMoreTech ? techs.length : 5)
                        .map((item, index) => (
                            <>
                                <Checkbox key={index}>{item}</Checkbox>
                                <br />
                            </>
                        ))}
                    <Button
                        onClick={handleShowMoreTech}
                        type="link"
                        style={{ marginTop: 8 }}
                    >
                        {showMoreTech ? "Thu gọn" : "Xem thêm"}
                    </Button>
                </div>
            </div>
            <div className="rounded-3xl bg-white min-w-[230px] w-[15%] my-3 p-5">
                <p className="text-[23px] font-bold">Mức lương</p>
                <div className="ml-3">
                    <div className="flex items-center mb-2">
                        <p className=" block w-[38px]">Từ: </p>
                        <Input />
                    </div>
                    <div className="flex items-center">
                        <p className="w-[38px] block">Đến: </p>
                        <Input />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
