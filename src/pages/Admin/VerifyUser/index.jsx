import React, { useEffect, useState } from "react";
import userServices from "@/services/userServices";
import MyTable from "../../../components/core/MyTable";

import { Image, Modal } from "antd";
import { renderJSXRoleUser } from "./../../../utils/render";

import authServices from "../../../services/authServices";
import Search from "./Search";
import DetailModal from "./DetailModal";

export default function VerifyUserManagement() {
  const [listUser, setListUser] = useState([]);
  const [reRender, setReRender] = useState(false);
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
      const res = await userServices.getListRequestVerifyUser({
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

  const onCancelDetailUser = () => {
    setUserId("");
    setOpenModalDetailUser(false);
  };
  const onConfirmDetailUser = () => {
    setUserId("");
    setOpenModalDetailUser(false);
    setReRender(!reRender);
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
      title: "Trạng thái",
      align: "center",

      render: (text, record) => <div>Chờ xác thực</div>,
    },
  ];
  console.log(listUser);
  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className="font-bold text-[17px]">Các đơn xác thực người dùng</div>
        <div></div>
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

      <DetailModal
        id={userId}
        onConfirm={onConfirmDetailUser}
        onCancel={onCancelDetailUser}
        open={openModalDetailUser}
      />
    </div>
  );
}
