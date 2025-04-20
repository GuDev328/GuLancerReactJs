import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import  groupServices  from '@/services/groupServices';
import MyTable from '../../../../components/core/MyTable';
import { MemberStatus } from '../../../../constant/group';
import { renderJSXRoleUser } from '../../../../utils/render';
import { Image } from 'antd';
import { Rate } from 'antd';
import { Modal } from 'antd';
import { showConfirmModal } from '../../../../components/core/MyModal';
import { useSelector } from 'react-redux';

const MemberTab = () => {
  const {id} =useParams()
   const userInfo = useSelector((state) => state.user.userInfo);
  const [listMember, setListMember] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [tableInfo, setTableInfo] = useState({
      page: 1,
      limit: 10,
      totalPage: 1,
    });
    useEffect(() => {
      const fetchListMember = async () => {
        const res = await groupServices.getMembers({
          id,
          page: tableInfo.page,
          limit: tableInfo.limit,
          status: MemberStatus.ACCEPTED,
        });
        setListMember(res);
      };
      fetchListMember();
    }, [tableInfo, reRender]);
  
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
        title: "Người dùng",
        align: "center",
        dataIndex: "avatar",
        key: "avatar",
        render: (text, record) => (
         <div className="flex items-center">
          <Image src={record.user_info.avatar} width={40} className=" rounded-full" />
          <div className="text-left">
            <div>{record.user_info.name}</div>
            <div className="text-gray-500">@{record.user_info.username}</div>
            <Rate style={{ fontSize: 15 }} value={record.user_info.star.$numberDecimal} />
          </div>
         </div>
        ),
      },
      
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (text, record) => record.user_info.email,
      },

      {
        title: "Vai trò",
        dataIndex: "role",
        align: "center",
        key: "role",
        render: (text, record) => renderJSXRoleUser(record.user_info.role),
      },
      {
        title: "Hành động",
        align: "center",
  
        render: (text, record) => (
          record.user_id !== userInfo._id && <div className="flex justify-center">
            <i className="fa-solid fa-right-from-bracket text-lg text-red-500 cursor-pointer ml-2"
              onClick={(e) => {
                e.stopPropagation();
  
                showConfirmModal({
                  title: "Xác nhận",
                  content: "Bạn có chắc chắn muốn cho người dùng này rời cộng đồng ?",
                  onOk: async () => {
                    const res = await groupServices.handleMember(record._id, MemberStatus.REJECTED);
                    if (res) {
                      setReRender(!reRender);
                      Modal.destroyAll();
                    }
                  },
                });
              }}
              ></i>
            </div> 
         
        ),
      },
    ];
  return (
    <div>
      <MyTable
             loading={!listMember.result}
             data={listMember.result?.members || []}
             columns={tableColumns}
             onChangePage={handleChangePage}
            //  onRowClick={(record) => {
            //    setUserId(record._id);
            //    setOpenModalDetailUser(true);
            //  }}
             pageInfo={{
               page: listMember.result?.pagination.page,
               limit: listMember.result?.pagination.limit,
               totalPage: listMember.result?.pagination.total_page,
             }}
           />
    </div>
  );
};

export default MemberTab;
