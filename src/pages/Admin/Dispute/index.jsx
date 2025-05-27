import React, { useEffect, useState } from "react";
import userServices from "@/services/userServices";
import MyTable from "../../../components/core/MyTable";

import { Image, Modal } from "antd";
import {
  renderJSXRoleUser,
  renderStatusDispute,
} from "./../../../utils/render";
import { Avatar } from "antd";
import { formatDate, formatDateTime } from "./../../../utils/common";
import { Tooltip } from "antd";

export default function DisputeManagement() {
  const [listDispute, setListDispute] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [searchValues, setSearchValues] = useState({});
  const [tableInfo, setTableInfo] = useState({
    page: 1,
    limit: 10,
    totalPage: 1,
  });
  useEffect(() => {
    const fetchListDispute = async () => {
      const res = await userServices.getListDispute({
        ...searchValues,
        page: tableInfo.page,
        limit: tableInfo.limit,
      });
      console.log(res);
      setListDispute(res.disputes);
    };
    fetchListDispute();
  }, [tableInfo, reRender, searchValues]);

  const handleChangePage = (page, size) => {
    setTableInfo({ ...tableInfo, page, limit: size });
  };

  const tableColumns = [
    {
      title: "STT",
      render: (text, record, index) => (
        <span>{(tableInfo.page - 1) * tableInfo.limit + index + 1}</span>
      ),
    },
    {
      title: "Mã dự án",
      align: "center",
      dataIndex: "project_id",
      key: "project_id",
    },
    {
      title: "Tên dự án",
      dataIndex: "project_name",
      align: "center",
      key: "project_name",
      render: (text, record) => <div>{record.project_info.title}</div>,
    },
    {
      title: "Người báo cáo",
      dataIndex: "reporter_info.username",
      key: "reporter_info.username",
      render: (text, record) => {
        const reporter_info =
          record.employer_info._id === record.reporter
            ? record.employee_info
            : record.freelancer_info;
        return (
          <div className="flex items-center gap-2">
            <div>
              <Avatar
                size={40}
                src={reporter_info.avatar}
                className="rounded-full"
              />
            </div>
            <div>{reporter_info.name}</div>
          </div>
        );
      },
    },
    {
      title: "Freelancer",
      dataIndex: "freelancer_info.name",
      key: "freelancer_info.name",
      render: (text, record) => {
        const freelancer_info = record.freelancer_info;
        return (
          <div className="flex items-center gap-2">
            <div>
              <Avatar
                size={40}
                src={freelancer_info.avatar}
                className="rounded-full"
              />
            </div>
            <div>{freelancer_info.name}</div>
          </div>
        );
      },
    },
    {
      title: "Employer",
      dataIndex: "employer_info.name",
      key: "employer_info.name",
      render: (text, record) => {
        const employer_info = record.employer_info;
        return (
          <div className="flex items-center gap-2">
            <div>
              <Avatar
                size={40}
                src={employer_info.avatar}
                className="rounded-full"
              />
            </div>
            <div>{employer_info.name}</div>
          </div>
        );
      },
    },
    {
      title: "Trạng thái",
      align: "center",

      render: (text, record) => <div>{renderStatusDispute(record.status)}</div>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (text, record) => <div> {formatDateTime(record.created_at)}</div>,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <div
          onClick={() => window.open(`/admin/dispute/${record._id}`, "_blank")}
        >
          <Tooltip title="Đi đến trang tranh chấp">
            <i className="fa-duotone text-main text-[20px]  cursor-pointer fa-solid fa-arrows-turn-right"></i>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="font-bold text-[17px]">Các tranh chấp dự án</div>
        <div></div>
      </div>
      {/* <Search setSearchValues={setSearchValues} /> */}
      <MyTable
        loading={!listDispute}
        data={listDispute}
        columns={tableColumns}
        onChangePage={handleChangePage}
        pageInfo={{
          page: listDispute.page,
          limit: listDispute.limit,
          totalPage: listDispute.total_page,
        }}
      />
    </div>
  );
}
