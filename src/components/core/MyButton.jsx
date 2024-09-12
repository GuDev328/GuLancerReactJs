import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-tailwind/react";

const MyButton = (props) => {
    const { className, ...rest } = props;
    return <Button className={` bg-main ${className}`} {...rest}></Button>;
};

MyButton.propTypes = {
    className: PropTypes.string, // className phải là chuỗi
};

MyButton.defaultProps = {
    className: "",
};

export default MyButton;
