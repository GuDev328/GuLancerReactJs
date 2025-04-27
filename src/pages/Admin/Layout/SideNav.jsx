import React, { useEffect, useRef, useState } from "react";
import { ConfigProvider, Layout, Menu } from "antd";
import {
  BoxPlotOutlined,
  GroupOutlined,
  BellOutlined,
  UserOutlined,
  WarningOutlined,
  BankOutlined,
  DeleteRowOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

const menuItems = [
  {
    label: <Link to={"dashboard"}>Tổng quan</Link>,
    key: "dashboard",
    icon: <HomeOutlined />,
  },
  {
    label: <Link to={"account-management"}>Quản trị tài khoản</Link>,
    key: "account-management",
    icon: <UserOutlined />,
  },
  {
    label: <Link to={"verify-management"}>Xác thực người dùng</Link>,
    key: "verify-management",
    icon: <BoxPlotOutlined />,
  },
  {
    label: <Link to={"dispute-management"}>Quản trị tranh chấp</Link>,
    key: "dispute-management",
    icon: <DeleteRowOutlined />,
  },
  {
    label: <Link to={"community-management"}>Quản trị cộng đồng</Link>,
    key: "community-management",
    icon: <BankOutlined />,
  },
  {
    label: <Link to={"report-management"}>Quản trị báo cáo</Link>,
    key: "report-management",
    icon: <WarningOutlined />,
  },
];

const rootSubmenuKeys = ["account-management"];

const SideNav = ({ ...others }) => {
  const nodeRef = useRef(null);
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState([""]);
  const [current, setCurrent] = useState("");

  const onClick = (e) => {
    console.log("click ", e);
  };

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    const paths = pathname.split("/");
    console.log(paths);

    setOpenKeys(paths);
    setCurrent(paths[paths.length - 1]);
  }, [pathname]);

  return (
    <Sider ref={nodeRef} breakpoint="lg" collapsedWidth="0" {...others}>
      <img src="/logo.png" className="h-[62px]" />
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: "none",
              itemSelectedBg: "#2881e2",
              itemHoverBg: "#95bce7",
              itemSelectedColor: "#fff",
            },
          },
        }}
      >
        <Menu
          mode="inline"
          items={menuItems}
          onClick={onClick}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          selectedKeys={[current]}
          style={{
            border: "none",
          }}
        />
      </ConfigProvider>
    </Sider>
  );
};

export default SideNav;
