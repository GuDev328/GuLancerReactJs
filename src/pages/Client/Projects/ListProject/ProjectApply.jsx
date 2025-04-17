import React, { useState } from 'react'
import MyTable from '../../../../components/core/MyTable'
import { Tag } from 'antd'
import projectServices from '../../../../services/projectServices'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { formatDate, formatDateTime } from './../../../../utils/common';
import { formatCurrency } from '@/utils/common';
import { useNavigate } from 'react-router-dom'
import { Flex } from 'antd'
import Apply from './../../ViewProject/components/Apply';

export default function ProjectApply() {
    const [pageInfo, setPageInfo] = useState({
        page: 1,
        limit: 10,
        totalPage: 5
    })
    const [open, setOpen] = useState(false);
    const naviagteTo = useNavigate();
    const [listApply, setListApply] = useState([]);
    const [applyIdSelected, setApplyIdSelected] = useState(null);
    const [isViewMode, setIsViewMode] = useState(false);
    const getListApply = useQuery({
        queryKey: ["getMyApply", pageInfo.page, 10],
        queryFn: () =>
          projectServices.getListApply({
            page: pageInfo.page,
            limit: 10,
          }),
      });

      useEffect(() => {
        if (getListApply.data) {
          setListApply(getListApply.data.result.applies);
          setPageInfo({
            page: getListApply.data.result.pagination.page,
            limit: getListApply.data.result.pagination.limit,
            totalPage: getListApply.data.result.pagination.totalPages,
          });
        }
      }, [getListApply.data]);

      const handleClickView = (record) => {
        setApplyIdSelected(record._id);
        setIsViewMode(true);
        setOpen(true);
      };

      const handleClickEdit = (record) => {
        setApplyIdSelected(record._id);
        setIsViewMode(false);
        setOpen(true);
      };

    const columns = [
        {
            title: 'Dự án',
            dataIndex: 'project',
            key: 'project',
            render: (text, record) => (
                <div>
                    <div className="font-semibold">{record.project.title}</div>

                </div>
            )
        },
        {
            title: 'Mức lương ứng tuyển',
            dataIndex: 'salary',
            key: 'salary',
            render: (text) => {
                return <span>{formatCurrency(text)}</span>
            }
        },
        {
            title: 'Ngày bắt đầu dự kiến',
            dataIndex: 'project.start_date',
            key: 'project.start_date',
            render: (text, record) => {
                return <span>{formatDate(record.project.start_date)}</span>
            }
        },
        {
            title: 'Ngày kết thúc dự kiến ứng tuyển',
            dataIndex: 'time_to_complete',
            key: 'time_to_complete',
            render: (text) => {
                return <span>{formatDate(text)}</span>
            }
        },
        {
            title: 'Ngày ứng tuyển',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text) => {
                return <span>{formatDateTime(text)}</span>
            }
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Flex className="gap-2 text-main text-[16px]">

                    <i onClick={() => handleClickView(record)} className="fa-solid fa-eye"></i>
                    <i onClick={() => handleClickEdit(record)} className="fa-solid fa-pen-to-square"></i>
                            
                    <i onClick={() => naviagteTo(`/project/${record.project._id}`)} className="fa-solid fa-share-all"></i>
    
                </Flex>
            )
        },
    ]


    const handleChangePage = (page, pageSize) => {
        setPageInfo(prev => ({
            ...prev,
            page: page,
            limit: pageSize
        }))
    }



    return (
        <div className="bg-white p-4 rounded-lg">
            <MyTable 
                columns={columns}
                data={listApply}
                pageInfo={pageInfo}
                onChangePage={handleChangePage}
            />
            <Apply open={open} refetchList={getListApply.refetch} 
            setOpen={setOpen} projectId={null} 
            applyId={applyIdSelected} 
           
            isViewMode={isViewMode}
            />
        </div>
    )
}
