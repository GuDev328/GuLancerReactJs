import React from 'react';
import { Tabs } from 'antd';
import ListProject from './ListProject';
import ProjectApply from './ProjectApply';
import ProjectInvite from './ProjectInvite';
import { UserRole } from '../../../../constant/user';
import { useSelector } from 'react-redux';

const tabs = [
  {
    key: 'my_projects',
    label: 'Các dự án',
    children: <ListProject />,
  },
  {
    key: 'applied_projects',
    label: 'Các đơn ứng tuyển',
    children: <ProjectApply />,
  },
  {
    key: 'saved_projects',
    label: 'Các lời mời',
    children: <ProjectInvite />,
  },
];

export default function ListProjectIndex() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const onChange = (key) => {
    console.log(key);
  };

  if(userInfo.role === UserRole.EMPLOYER) return <ListProject />;

  return (
    <div className="w-full min-h-[80vh] px-5 bg-[#f0f0f3]">
      <Tabs
        defaultActiveKey="my_projects"
        items={tabs}
        onChange={onChange}
        className="w-full"
      />
    </div>
  );
}
