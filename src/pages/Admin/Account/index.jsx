import React, { useEffect, useState } from "react";
import userServices from "@/services/userServices";
import MyTable from "../../../components/core/MyTable";

import { Image, Modal } from "antd";
import { renderJSXRoleUser } from "./../../../utils/render";
import MyButton from "@/components/core/MyButton";
import Icon, {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import CreateAccountModal from "./CreateAccountModal";
import authServices from "../../../services/authServices";
import DetailUserModal from "./DetailUserModal";
import { set } from "lodash";
import MyModal, { showConfirmModal } from "../../../components/core/MyModal";
import Search from "./Search";

export default function AccountManagement() {
  const [listUser, setListUser] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [openModalCreateAccount, setOpenModalCreateAccount] = useState(false);
  const [openModalDetailUser, setOpenModalDetailUser] = useState(false);
  const [searchValues, setSearchValues] = useState({});
  const [userId, setUserId] = useState("");
  const [tableInfo, setTableInfo] = useState({
    page: 1,
    limit: 10,
    totalPage: 1,
  });
  useEffect(() => {
    const fetchListUser = async () => {
      const res = await userServices.getListUser({
        ...searchValues,
        page: tableInfo.page,
        limit: tableInfo.limit,
      });
      setListUser(res);
    };
    fetchListUser();
  }, [tableInfo, reRender, searchValues]);

  const handleChangePage = (page, size) => {
    setTableInfo({ ...tableInfo, page, limit: size });
  };

  const onCancelCreateAccount = () => {
    setOpenModalCreateAccount(false);
  };
  const onConfirmCreateAccount = async (dataForm) => {
    const res = await authServices.register(dataForm);
    if (res) {
      setOpenModalCreateAccount(false);
      setReRender(!reRender);
    }
    return res;
  };

  const onCancelDetailUser = () => {
    setUserId("");
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
      title: "Avatar",
      align: "center",
      dataIndex: "avatar",
      key: "avatar",
      render: (text, record) => (
        <Image src={record.avatar} width={40} className=" rounded-full" />
      ),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      align: "center",
      key: "role",
      render: (text, record) => renderJSXRoleUser(record.role),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Hành động",
      align: "center",

      render: (text, record) => (
        <div className="flex justify-center">
          <EditOutlined className="text-blue-500 cursor-pointer" />
          <DeleteOutlined
            onClick={(e) => {
              e.stopPropagation();

              showConfirmModal({
                title: "Xác nhận",
                content: "Bạn có chắc chắn muốn xóa tài khoản này?",
                onOk: async () => {
                  const res = await userServices.deleteUser(record._id);
                  if (res) {
                    setReRender(!reRender);
                    Modal.destroyAll();
                  }
                },
              });
            }}
            className="text-red-500 cursor-pointer ml-2"
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="font-bold text-[17px]">Quản lý tài khoản</div>
        <MyButton onClick={() => setOpenModalCreateAccount(true)} size="sm">
          <PlusOutlined />
          Thêm mới
        </MyButton>
      </div>
      <Search setSearchValues={setSearchValues} />
      <MyTable
        loading={!listUser.result}
        data={listUser.result}
        columns={tableColumns}
        onChangePage={handleChangePage}
        onRowClick={(record) => {
          setUserId(record._id);
          setOpenModalDetailUser(true);
        }}
        pageInfo={{
          page: listUser.page,
          limit: listUser.limit,
          totalPage: listUser.total_page,
        }}
      />
      <CreateAccountModal
        open={openModalCreateAccount}
        onCancel={onCancelCreateAccount}
        onConfirm={onConfirmCreateAccount}
      />
      <DetailUserModal
        id={userId}
        onCancel={onCancelDetailUser}
        open={openModalDetailUser}
      />
    </div>
  );
}
