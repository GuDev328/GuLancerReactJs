import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-tailwind/react";

const MyButton = (props) => {
  const { className = "", children, ...rest } = props;
  return (
    <Button className={` ${className}`} color="blue" {...rest}>
      {children}
    </Button>
  );
};

MyButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default MyButton;
