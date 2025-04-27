import React, { useEffect, useState } from "react";
import { Image, Modal, message } from "antd";
import MyTable from "../../../components/core/MyTable";
import MyButton from "@/components/core/MyButton";
import { showConfirmModal } from "../../../components/core/MyModal";
import groupServices from "@/services/groupServices";
import Search from "./Search";
import { SearchOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { formatDateTime } from "../../../utils/common";

export default function GroupManagement() {
  const [groups, setGroups] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [searchValues, setSearchValues] = useState({
    search_key: "",
    sort_by: "created_at",
    order_by: "desc",
  });
  const [tableInfo, setTableInfo] = useState({
    page: 1,
    limit: 10,
    totalPage: 1,
  });

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await groupServices.getAllGroups({
          ...searchValues,
          page: tableInfo.page,
          limit: tableInfo.limit,
        });
        setGroups(res.result);
        setTableInfo((prev) => ({
          ...prev,
          totalPage: res.total_page,
        }));
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, [tableInfo.page, tableInfo.limit, reRender, searchValues]);

  const handleChangePage = (page, size) => {
    setTableInfo({ ...tableInfo, page, limit: size });
  };

  const handleDeleteGroup = async (groupId) => {
    showConfirmModal({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xoá nhóm này?",
      onOk: async () => {
        try {
          const res = await groupServices.deleteGroup(groupId);
          if (res) {
            message.success("Xoá nhóm thành công");
            setReRender(!reRender);
            Modal.destroyAll();
          }
        } catch (error) {
          message.error("Có lỗi xảy ra khi xoá nhóm");
        }
      },
    });
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
      align: "center",
      dataIndex: "cover_photo",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Image src={record.cover_photo} width={100} className="rounded" />

          <div className="font-bold">{record.name}</div>
        </div>
      ),
    },
    {
      title: "Chủ nhóm",
      dataIndex: "owner_id",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Avatar
            src={record.admin_info[0].avatar || ""}
            width={100}
            className="rounded"
          />
          <div className="font-bold">{record.admin_info[0].name}</div>
        </div>
      ),
    },

    {
      title: "Số thành viên",
      dataIndex: "members_count",
      align: "center",
    },
    {
      title: "Số bài viết",
      dataIndex: "posts_count",
      align: "center",
    },
    {
      title: "Ngày thành lập",
      dataIndex: "created_at",
      render: (text) => (
        <div className="max-w-[300px] truncate">{formatDateTime(text)}</div>
      ),
    },
    {
      title: "Hành động",
      align: "center",
      render: (text, record) => (
        <div className="flex gap-2 justify-center">
          <div
            onClick={() =>
              window.open(
                `/admin/report-management/detail-group/${record._id}`,
                "_blank"
              )
            }
          >
            <i className="fa-duotone text-main cursor-pointer fa-solid fa-arrows-turn-right"></i>
          </div>
          <div onClick={() => handleDeleteGroup(record._id)}>
            <i className="fa-regular text-red-500 cursor-pointer fa-trash"></i>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="text-[16px] font-bold mb-4">Quản lý cộng đồng</div>
      <Search setSearchValues={setSearchValues} />
      <div className="mt-4">
        <MyTable
          columns={tableColumns}
          dataSource={groups}
          onChangePage={handleChangePage}
          pageInfo={{
            page: tableInfo.page,
            limit: tableInfo.limit,
            totalPage: tableInfo.totalPage,
          }}
        />
      </div>
    </div>
  );
}
