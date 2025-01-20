import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { UserRole } from "@/constant/user";
import NotAuthorized from "../../pages/Auth/NotAuthorized";

const WrapperRouter = ({ Component, auth = true, admin = false, ...props }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("accessToken");
  if (!auth) return <Component {...props} />;
  if (auth && !isAuthenticated) {
    window.location.href = "/login";
    return;
  }
  const user = JSON.parse(localStorage.getItem("user"));
  if (admin && user.role !== UserRole.ADMIN) {
    return <NotAuthorized />;
  }
  return <Component {...props} />;
};

WrapperRouter.propTypes = {
  Component: PropTypes.elementType.isRequired,
  auth: PropTypes.bool,
  admin: PropTypes.bool,
};

export default WrapperRouter;
