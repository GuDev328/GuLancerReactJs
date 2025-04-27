import React, { useEffect, useState } from "react";
import { Image, Modal, message } from "antd";
import MyTable from "../../../components/core/MyTable";
import MyButton from "@/components/core/MyButton";
import {
  showConfirmModal,
  showInfoModal,
} from "../../../components/core/MyModal";
import groupServices from "@/services/groupServices";
import UserName from "@/components/business/UserName";
import { Avatar } from "antd";
import { Tooltip } from "antd";
import DetailUserModal from "../Account/DetailUserModal";

const CommunityTab = () => {
  const [reports, setReports] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [tableInfo, setTableInfo] = useState({
    page: 1,
    limit: 10,
    totalPage: 1,
  });
  const [openModalDetailUser, setOpenModalDetailUser] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      const res = await groupServices.getReports({
        page: tableInfo.page,
        limit: tableInfo.limit,
      });
      setReports(res.result);
      setTableInfo((prev) => ({
        ...prev,
        totalPage: res.total_page,
      }));
    };
    fetchReports();
  }, [tableInfo.page, tableInfo.limit, reRender]);

  const handleChangePage = (page, size) => {
    setTableInfo({ ...tableInfo, page, limit: size });
  };

  const handleRejectReport = async (reportId) => {
    showConfirmModal({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn từ chối đơn báo cáo này?",
      onOk: async () => {
        const res = await groupServices.rejectReport(reportId);
        if (res) {
          message.success(res.data.message);
          setReRender(!reRender);
          Modal.destroyAll();
        }
      },
    });
  };

  const handleApproveReport = async (reportId) => {
    showConfirmModal({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xoá nhóm này?",
      onOk: async () => {
        const res = await groupServices.approveReport(reportId);
        if (res) {
          message.success(res.data.message);
          setReRender(!reRender);
          Modal.destroyAll();
        }
      },
    });
  };

  const handleViewDetail = (description) => {
    showInfoModal({
      title: "Chi tiết báo cáo",
      content: description,
      cancelText: "Đóng",
    });
  };

  const handleViewUserDetail = (userId) => {
    setSelectedUserId(userId);
    setOpenModalDetailUser(true);
  };

  const handleCloseUserDetail = () => {
    setSelectedUserId("");
    setOpenModalDetailUser(false);
  };

  const tableColumns = [
    {
      title: "STT",
      render: (text, record, index) => (
        <span>{(tableInfo.page - 1) * tableInfo.limit + index + 1}</span>
      ),
    },
    {
      title: "Nhóm",
      dataIndex: "group",
      render: (text, record) => (
        <div className="flex gap-2">
          <Image src={record.group?.cover_photo} width={40} />
          <span>{record.group?.name}</span>
        </div>
      ),
    },
    {
      title: "Chủ cộng đồng",
      dataIndex: "group",
      render: (text, record) => (
        <div
          className="flex gap-2 items-center cursor-pointer hover:text-blue-500"
          onClick={() => handleViewUserDetail(record.admin_info[0]?._id)}
        >
          <Avatar src={record.admin_info[0]?.avatar} width={50} />
          <span>{record.admin_info[0]?.name}</span>
        </div>
      ),
    },
    {
      title: "Người báo cáo",
      dataIndex: "group",
      render: (text, record) => (
        <div
          className="flex gap-2 items-center cursor-pointer hover:text-blue-500"
          onClick={() => handleViewUserDetail(record.reporter_info._id)}
        >
          <Avatar src={record.reporter_info.avatar} width={50} />
          <span>{record.reporter_info.name}</span>
        </div>
      ),
    },
    {
      title: "Nội dung báo cáo",
      dataIndex: "description",
    },
    {
      title: "Hành động",
      align: "center",
      render: (text, record) => (
        <div className="flex gap-2 justify-center">
          <div onClick={() => handleViewDetail(record.description)}>
            <Tooltip title="Xem chi tiết">
              <i className="text-main fa-solid mr-2 fa-eye"></i>
            </Tooltip>
          </div>
          <div onClick={() => handleRejectReport(record._id)}>
            <Tooltip title="Từ chối đơn báo cáo">
              <i className="text-main fa-solid mr-2 fa-xmark-to-slot"></i>{" "}
            </Tooltip>
          </div>
          <div onClick={() => handleApproveReport(record._id)}>
            <Tooltip title="Xoá nhóm">
              <i className="text-red-500 fa-regular mr-2 fa-trash"></i>
            </Tooltip>
          </div>
          <div
            onClick={() =>
              window.open(
                `/admin/report-management/detail-group/${record.group._id}`,
                "_blank"
              )
            }
          >
            <Tooltip title="Đi đến cộng đồng">
              <i className="fa-duotone text-main  cursor-pointer fa-solid fa-arrows-turn-right"></i>
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <MyTable
        columns={tableColumns}
        dataSource={reports}
        onChangePage={handleChangePage}
        pageInfo={{
          page: tableInfo.page,
          limit: tableInfo.limit,
          totalPage: tableInfo.totalPage,
        }}
      />
      <DetailUserModal
        id={selectedUserId}
        open={openModalDetailUser}
        onCancel={handleCloseUserDetail}
      />
    </div>
  );
};

export default CommunityTab;
