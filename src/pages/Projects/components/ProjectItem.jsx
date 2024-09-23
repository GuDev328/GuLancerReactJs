import React from "react";
import { Avatar } from "antd";
import PropTypes from "prop-types";
import { formatCurrency, formatNumber } from "../../../utils/common";

const ProjectItem = ({ data }) => {
    return (
        <div className="bg-shadow my-1 rounded-lg p-2">
            <div className="text-[16px]">{data?.title}</div>
            <div className="flex justify-between">
                <div className="flex items-center">
                    <Avatar size={25} src={data?.admin_info[0]?.avatar} />
                    <p className="ml-1 text-[13px]">
                        {data?.admin_info[0]?.name}
                    </p>
                </div>
                <div className="flex items-center text-main">
                    {formatCurrency(data?.salary)}
                </div>
            </div>
        </div>
    );
};

ProjectItem.propTypes = {
    data: PropTypes.object,
};

export default ProjectItem;
