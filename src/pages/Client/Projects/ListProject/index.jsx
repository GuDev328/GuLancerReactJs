import React from 'react';
import { Tabs } from 'antd';
import ListProject from './ListProject';
import ProjectApply from './ProjectApply';
import ProjectInvite from './ProjectInvite';

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
  const onChange = (key) => {
    console.log(key);
  };

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
