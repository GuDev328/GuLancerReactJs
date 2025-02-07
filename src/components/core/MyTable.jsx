import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";

const MyTable = ({
  columns,
  data,
  pageInfo,
  onRowClick,
  onChangePage,
  ...props
}) => {
  return (
    <Table
      pagination={{
        current: pageInfo.page,
        pageSize: pageInfo.limit,
        total: pageInfo.totalPage * pageInfo.limit,
        showSizeChanger: true,
        locale: { items_per_page: "/trang" },
        onChange: (page, size) => {
          onChangePage(page, size);
        },
      }}
      scroll={{ x: 1000 }}
      onRow={(record) => ({
        onClick: () => {
          onRowClick(record);
        },
        style: { cursor: "pointer" },
      })}
      columns={columns}
      dataSource={data}
      {...props}
    />
  );
};
MyTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  pageInfo: PropTypes.object.isRequired,
  onRowClick: PropTypes.func,
  onChangePage: PropTypes.func,
};

export default MyTable;
