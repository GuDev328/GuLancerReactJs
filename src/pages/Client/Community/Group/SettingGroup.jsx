import React from 'react';
import { Tabs } from 'antd';
import CommunityInfoTab from './CommunityInfoTab';
import MemberTab from './MemberTab';
import PendingPostsTab from './PendingPostsTab';
import MemberPending from './MemberPending';
export default function SettingGroup() {
  return (
    <div className="w-full bg-white my-4 pb-5 px-5 mr-4 rounded-xl">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Thông tin cộng đồng" key="1">
          <CommunityInfoTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Thành viên" key="2">
          <MemberTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Thành viên chờ" key="4">
          <MemberPending />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Các bài viết đang chờ kiểm duyệt" key="3">
          <PendingPostsTab />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
