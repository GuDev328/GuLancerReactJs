import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { UserRole } from "@/constant/user";
import NotAuthorized from "../../pages/Auth/NotAuthorized";
import { useEffect } from "react";

const AuthWrapperRouter = ({ Component, ...props }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("accessToken");
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      return;
    }
  }, []);
  if (isAuthenticated) return null;
  return <Component {...props} />;
};

AuthWrapperRouter.propTypes = {
  Component: PropTypes.elementType.isRequired,
  auth: PropTypes.bool,
  admin: PropTypes.bool,
};

export default AuthWrapperRouter;
