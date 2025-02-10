import {
  Button,
  Dropdown,
  Flex,
  FloatButton,
  Input,
  Layout,
  message,
  theme,
  Tooltip,
  Switch,
} from "antd";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  AppstoreOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  QuestionOutlined,
  SettingOutlined,
  UserOutlined,
  MoonOutlined,
  SunOutlined,
  DownCircleOutlined,
} from "@ant-design/icons";
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from "react-transition-group";
import { useMediaQuery } from "react-responsive";
import SideNav from "./SideNav.jsx";
import authServices from "@/services/authServices";
import { setUserInfo } from "@/stores/slice/user.slice";
import AccountManagement from "../Account/index.jsx";
import { useSelector } from "react-redux";

const { Content, Header } = Layout;

const AdminLayout = ({ children }) => {
  const {
    token: { borderRadius },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const [collapsed, setCollapsed] = useState(true);
  const [navFill, setNavFill] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useSelector((state) => state.user.userInfo);
  const location = useLocation();
  const navigate = useNavigate();
  const nodeRef = useRef(null);
  const floatBtnRef = useRef(null);
  const items = [
    {
      key: "user-profile-link",
      label: "Thông tin cá nhân",
      icon: <UserOutlined />,
    },

    {
      type: "divider",
    },
    {
      key: "user-logout-link",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: async () => {
        await authServices.logout();
        setUserInfo(null);
        localStorage.clear();
        setTimeout(() => {
          navigate("/login");
        }, 200);
      },
    },
  ];

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 5) {
        setNavFill(true);
      } else {
        setNavFill(false);
      }
    });
  }, []);

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          // backgroundColor: 'white',
        }}
      >
        <SideNav
          trigger={null}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            overflow: "auto",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            background: "none",
            border: "none",
            transition: "all .2s",
          }}
        />
        <Layout
          style={
            {
              // background: 'none',
            }
          }
        >
          <Header
            style={{
              marginLeft: collapsed ? 0 : "200px",
              padding: "0 2rem 0 0",
              background: "#2881e2",
              backdropFilter: navFill ? "blur(8px)" : "none",
              boxShadow: navFill ? "0 0 8px 2px rgba(0, 0, 0, 0.05)" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "sticky",
              top: 0,
              zIndex: 1,
              gap: 8,
              transition: "all .25s",
            }}
          >
            <Flex align="center">
              <Tooltip title={`${collapsed ? "Mở rộng" : "Thu lại"}`}>
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    color: "#fff",
                    height: 64,
                  }}
                />
              </Tooltip>
            </Flex>
            <Flex align="center" gap="small">
              <Dropdown menu={{ items }} trigger={["click"]}>
                <div style={{ color: "#fff" }}>
                  Xin chào, {userInfo.name} <DownCircleOutlined />
                </div>
              </Dropdown>
            </Flex>
          </Header>
          <Content
            style={{
              margin: `0 0 0 ${collapsed ? 0 : "200px"}`,
              background: "#ebedf0",
              borderRadius: collapsed ? 0 : borderRadius,
              transition: "all .25s",
              padding: "24px 32px",
              minHeight: 360,
            }}
          >
            <TransitionGroup>
              <SwitchTransition>
                <CSSTransition
                  key={`css-transition-${location.key}`}
                  nodeRef={nodeRef}
                  onEnter={() => {
                    setIsLoading(true);
                  }}
                  onEntered={() => {
                    setIsLoading(false);
                  }}
                  timeout={300}
                  classNames="bottom-to-top"
                  unmountOnExit
                >
                  {() => (
                    <div ref={nodeRef} style={{ background: "none" }}>
                      {children}
                    </div>
                  )}
                </CSSTransition>
              </SwitchTransition>
            </TransitionGroup>
            <div ref={floatBtnRef}>
              <FloatButton.BackTop />
            </div>
          </Content>
          <div
            style={{
              textAlign: "center",
              marginLeft: collapsed ? 0 : "200px",
              background: "none",
            }}
          />
        </Layout>
      </Layout>
    </>
  );
};
AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
