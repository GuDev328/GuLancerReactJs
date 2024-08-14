import React, { Fragment } from "react";
import { Drawer } from "antd";
import { Checkbox, Button, Typography, Form, Input } from "antd";
import PropTypes from "prop-types";
import Filter from "./Filter";
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
const FilterDrawer = ({ open, setOpen }) => {
    const [showMoreTech, setShowMoreTech] = React.useState(false);
    const [showMoreField, setShowMoreField] = React.useState(false);
    const handleShowMoreTech = () => {
        setShowMoreTech(!showMoreTech);
    };
    const handleShowMoreFiled = () => {
        setShowMoreField(!showMoreField);
    };
    const closeDrawer = () => setOpen(false);
    return (
        <div>
            <Drawer title="Bộ Lọc" onClose={closeDrawer} open={open}>
                <div className="">
                    <div className="rounded-3xl bg-white  p-2">
                        <p className="text-[23px] font-bold">Kiểu dự án</p>
                        <div className="ml-3">
                            <Checkbox>Trả lương theo giờ</Checkbox>
                            <br />
                            <Checkbox>Trả lương theo dự án</Checkbox>
                        </div>
                    </div>
                    <div className="rounded-3xl bg-white min-w-[230px] w-[15%]  p-2">
                        <p className="text-[23px] font-bold">Lĩnh vực</p>
                        <div className="ml-3">
                            {fields
                                .slice(0, showMoreField ? fields.length : 5)
                                .map((item, index) => (
                                    <Fragment key={index}>
                                        <Checkbox key={index}>{item}</Checkbox>
                                        <br />
                                    </Fragment>
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

                    <div className="rounded-3xl bg-white min-w-[230px] w-[15%]  p-2">
                        <p className="text-[23px] font-bold">Công nghệ</p>
                        <div className="ml-3">
                            {techs
                                .slice(0, showMoreTech ? techs.length : 5)
                                .map((item, index) => (
                                    <Fragment key={index}>
                                        <Checkbox key={index}>{item}</Checkbox>
                                        <br />
                                    </Fragment>
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
                    <div className="rounded-3xl bg-white min-w-[230px] w-[15%]  p-2">
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
            </Drawer>
        </div>
    );
};

FilterDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};

export default FilterDrawer;
