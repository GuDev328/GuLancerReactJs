import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const UserName = ({
  data,
  className,
  nameClassName,
  usernameClassName,
  noNavigate,
}) => {
  const navigate = useNavigate();
  const nameClass = nameClassName ? nameClassName : "text-[16px] mr-2";
  const usernameClass = usernameClassName
    ? usernameClassName
    : "text-[13px] text-gray-500";

  const handleClick = () => {
    !noNavigate && navigate(`/profile/${data?._id}`);
  };
  return (
    <div
      className={`${className} cursor-pointer flex items-center`}
      onClick={handleClick}
    >
      <span className={`${nameClass} hover:text-main`}>{data.name}</span>
      <span className={`${usernameClass} hover:text-main`}>
        @{data.username}
      </span>
    </div>
  );
};

UserName.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
  nameClassName: PropTypes.string,
  usernameClassName: PropTypes.string,
  noNavigate: PropTypes.bool,
};

export default UserName;
