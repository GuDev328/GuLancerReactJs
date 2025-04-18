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

export default function ProjectInvite() {
    const [pageInfo, setPageInfo] = useState({
        page: 1,
        limit: 10,
        totalPage: 5
    })
    const naviagteTo = useNavigate();
    const [listApply, setListApply] = useState([])
    const getListApply = useQuery({
        queryKey: ["getMyInvite", pageInfo.page, 10],
        queryFn: () =>
          projectServices.getListInvite({
            page: pageInfo.page,
            limit: 10,
          }),
      });

      useEffect(() => {
        if (getListApply.data) {
          setListApply(getListApply.data.result.applies);
          setPageInfo({
            page: getListApply.data.result.page,
            limit: getListApply.data.result.limit,
            totalPage: getListApply.data.result.totalPages,
          });
        }
      }, [getListApply.data]);
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
            title: 'Mức lương ',
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
            title: 'Ngày kết thúc dự kiến',
            dataIndex: 'time_to_complete',
            key: 'time_to_complete',
            render: (text) => {
                return <span>{formatDate(text)}</span>
            }
        },
        {
            title: 'Ngày mời tham gia dự án',
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
                <Flex gap={10}>

                <div onClick={() => naviagteTo(`/project/${record.project._id}`)} className="text-main cursor-pointer hover:underline">
                    Xem chi tiết dự án
                </div>
                 <div onClick={() => handleAcceptInvite(record._id)} className="text-main cursor-pointer hover:underline">
                Chấp nhận
             </div>
                </Flex>
            )
        },
    ]

    const handleAcceptInvite = async(invite_id)=>{
        await projectServices.acceptApplyInvite(invite_id)
        getListApply.refetch()
    }

    const handleChangePage = (page, pageSize) => {
        setPageInfo(prev => ({
            ...prev,
            page: page,
            limit: pageSize
        }))
    }

    const handleRowClick = (record) => {
        console.log('Clicked row:', record)
    }

    return (
        <div className="bg-white p-4 rounded-lg">
            <MyTable 
                columns={columns}
                data={listApply}
                pageInfo={pageInfo}
                onChangePage={handleChangePage}
                onRowClick={handleRowClick}
            />
        </div>
    )
}
