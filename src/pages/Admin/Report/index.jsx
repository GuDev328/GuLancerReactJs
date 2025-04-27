import React from "react";
import { Tabs } from "antd";
import CommunityTab from "./CommunityTab";
import PostsTab from "./PostsTab";

const Report = () => {
  const items = [
    {
      key: "1",
      label: "Bài viết",
      children: <PostsTab />,
    },
    {
      key: "2",
      label: "Cộng đồng",
      children: <CommunityTab />,
    },
  ];

  return (
    <div>
      <div className="text-[16px] font-bold" key="title">
        Quản trị các đơn báo cáo
      </div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default Report;
