import "react-toastify/dist/ReactToastify.css";

import React from "react";
import { Select, Option, Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import projectServices from "@/services/projectServices";
import { Pagination, Spin } from "antd";
import ProjectItem from "./../components/ProjectItem";
import { use } from "react";
import { useSelector } from "react-redux";
import { ProjectStatus } from "../../../../constant/project";
import { values } from "lodash";

function ListProject() {
  const naviagteTo = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [pagiation, setPagination] = React.useState({
    page: 1,
    total: 0,
    limit: 10,
  });
  const [type, setType] = React.useState(undefined);
  const getMyProject = useQuery({
    queryKey: ["getMyProject", pagiation.page, 10, type],
    queryFn: () =>
      projectServices.getMyProject({
        page: pagiation.page,
        limit: 10,
        type: type,
      }),
    onSuccess: (res) => {
      console.log(res);
      setPagination({
        page: res.data.result.page,
        total: res.data.result.total,
      });
    },
  });

  const listProject = getMyProject.data?.result.data;
  return (
    <div className="flex my-3 justify-center">
      <div className=" px-3 w-[95%]  pb-2 rounded-xl bg-white">
        {userInfo?.role === 1 && (
          <Button
            onClick={() => naviagteTo("create")}
            on
            size="sm"
            className="w-full mt-3 bg-main"
          >
            <i className="fas fa-plus"></i> Tạo dự án mới
          </Button>
        )}

        <div className="mb-2">
          <Select
            className="text-[22px] font-bold text-black font-sans"
            variant="static"
            size="lg"
            value={99}
            onChange={(value) => {
              setType(value === 99 ? undefined : value);
            }}
          >
            <Option value={99}>Tất cả dự án</Option>
            <Option value={ProjectStatus.NotReady}>Các dự án đang chờ</Option>
            <Option value={ProjectStatus.Recruiting}>
              Các dự án đang tuyển nhân sự
            </Option>
            <Option value={ProjectStatus.Processing}>
              Các dự án đang tiến hành
            </Option>
            <Option value={ProjectStatus.Pause}>Các dự án tạm dừng</Option>
            <Option value={ProjectStatus.Complete}>
              Các dự án đã hoàn thành
            </Option>
            <Option value={ProjectStatus.Paying}>
              Các dự án đang thanh toán
            </Option>

            <Option value={ProjectStatus.Disputed}>
              Các dự án đang có xung đột
            </Option>
          </Select>
        </div>
        {getMyProject.isLoading ? (
          <Spin spinning={true}></Spin>
        ) : (
          <div className="">
            {listProject?.length > 0 ? (
              <div>
                {listProject?.map((item) => (
                  <div
                    key={item._id}
                    className="cursor-pointer"
                    onClick={() => naviagteTo(`/projects/detail/${item._id}`)}
                  >
                    <ProjectItem data={item} />
                  </div>
                ))}
                <Pagination
                  onChange={(page) => setPagination({ ...pagiation, page })}
                  current={pagiation.page}
                  total={pagiation.total}
                  pageSize={10}
                />
              </div>
            ) : (
              <div className="text-center place-content-center h-[50vh] text-gray-500">
                Chưa có dự án nào
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListProject;
