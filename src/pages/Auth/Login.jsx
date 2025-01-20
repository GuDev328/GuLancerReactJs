import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import logo from "/logo.png";
import authServices from "../../services/authServices";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { Button, Input } from "@material-tailwind/react";
import userServices from "../../services/userServices";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import { UserRole } from "../../constant/user";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigateTo = useNavigate();
  const [showModalRole, setShowModalRole] = useState(false);
  const location = useLocation();
  const [chooseRole, setChooseRole] = useState(2);

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const jwt = queryParams.get("jwt");
    if (jwt && jwt === "out")
      toast.info("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");

    const access_token = queryParams.get("access_token");
    const refresh_token = queryParams.get("refresh_token");
    const newUser = queryParams.get("newUser");
    const fetchMe = async () => {
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);
      const userInfoRes = await userServices.getMe();
      if (newUser === "true") setShowModalRole(true);
      else if (userInfoRes.data.result.role === UserRole.ADMIN)
        navigateTo("/admin");
      else navigateTo("/");
    };
    if (access_token && refresh_token && newUser) {
      fetchMe();
    }
  }, [navigateTo]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSignIn();
    }
  };
  const handleSignIn = async () => {
    if (email.length === 0 || password.length === 0) {
      toast.error("Không được để trống tài khoản hoặc mật khẩu");
      return;
    }
    const res = await authServices.login(email, password);
    console.log(res.user.role);
    if (res) {
      if (res.user.role === UserRole.ADMIN) navigateTo("/admin");
      else navigateTo("/");
    }
  };

  const getGoogleAuthUrl = () => {
    const url = "https://accounts.google.com/o/oauth2/v2/auth";
    const query = {
      client_id:
        "294706840114-t2lg15qp50aq258pob2n3chvvdo7ue9i.apps.googleusercontent.com",
      redirect_uri: "http://localhost:3030/users/oauth/google",
      response_type: "code",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
      prompt: "consent",
      access_type: "offline",
    };
    const queryString = new URLSearchParams(query).toString();
    return `${url}?${queryString}`;
  };
  const link = getGoogleAuthUrl();

  const handleInitRole = async () => {
    if (chooseRole === 2) {
      toast.error("Hãy chọn vai trò của bạn");
      return;
    } else {
      await userServices.initRole({ role: chooseRole });
      navigateTo("/");
    }
  };
  return (
    <div
      className="flex w-full h-[100vh] justify-center items-center"
      style={{ backgroundColor: "#e6e6e6" }}
    >
      <div className="container mx-auto p-3 my-5">
        <div className="flex flex-row">
          <div className="hidden lg:block lg:w-6/12">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>

          <div
            className="w-full p-5 rounded-3xl lg:w-4/12 flex justify-center items-center flex-col mb-5"
            style={{ backgroundColor: "#ffffff" }}
          >
            <img
              className="mx-auto w-3/4 lg:w-full mb-10"
              style={{ width: "250px" }}
              src={logo}
              alt=""
            />
            <div className="mb-3 w-full">
              <Input
                label="Email"
                value={email}
                onKeyDown={handleKeyPress}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </div>

            <div className="mb-2 w-full form-group">
              <div className="passwordInput">
                <Input
                  label="Mật khẩu"
                  type={showPassword ? "text" : "password"}
                  onKeyDown={handleKeyPress}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="hideShowPasswordBtn"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </div>
              </div>
            </div>

            <div className="mx-4 text-sm me-auto mb-4">
              <Link to="/forgot-password" className="text-blue-500">
                Quên mật khẩu?
              </Link>
            </div>

            <Button
              onClick={handleSignIn}
              className="btn mb-1  font-bold"
              style={{
                backgroundColor: "#2881E2",
                width: "70%",
                color: "white",
              }}
              type="button"
              size="sm"
            >
              Đăng nhập
            </Button>

            <Button
              onClick={() => (window.location.href = link)}
              className="focus:outline-none mb-2"
              style={{
                width: "70%",
                backgroundColor: "#fd2f19",
              }}
              type="button"
              size="sm"
            >
              <i className="fa-brands fa-google mx-2"></i>
              Đăng nhập với Google
            </Button>

            <div className="text-sm">
              Chưa có tài khoản? <Link to="/register">Đăng ký</Link>{" "}
            </div>
          </div>
        </div>
      </div>
      <Modal
        centered
        open={showModalRole}
        title="Lựa chọn VAI TRÒ của bạn"
        closeIcon={null}
        footer={
          <Button onClick={handleInitRole} className="bg-main" size="sm">
            Xác nhận
          </Button>
        }
      >
        <div className="flex p-5 justify-around items-center mb-4">
          <Button
            className="p-4 focus:outline-none border-0"
            style={{
              backgroundColor: chooseRole === 0 ? "#2881E2" : "#333",
            }}
            onClick={() => setChooseRole(0)}
          >
            Tôi là Freelancer
          </Button>
          <Button
            className="p-4 focus:outline-none border-0"
            style={{
              backgroundColor: chooseRole === 1 ? "#2881E2" : "#333",
            }}
            onClick={() => setChooseRole(1)}
          >
            Tôi là Employer{" "}
          </Button>
        </div>
      </Modal>
      <ToastContainer stacked />
    </div>
  );
}

export default Login;
