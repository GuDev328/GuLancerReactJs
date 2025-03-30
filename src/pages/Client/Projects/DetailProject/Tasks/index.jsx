import React, { useState } from "react";
import MyButton from "@/components/core/MyButton";

import { DatePicker, Flex, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableTask from "./TableTask";
import { useSelector } from "react-redux";
import ModalCUTask from "./ModalCUTask";
import { useContext } from "react";
import { ProjectInfoContext } from "../../../../Both/Dispute";

const Tasks = () => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [reRender, setReRender] = useState(false);
  const disputeInfo = useContext(ProjectInfoContext);
  const isMobile = useSelector((state) => state.screen.isMobile);

  const handleOkModal = async () => {
    setIsOpenModal(false);
    setReRender((pre) => !pre);
  };
  const handleCancelModal = async () => {
    setIsOpenModal(false);
  };
  return (
    <div className="relative">
      {!disputeInfo && (
        <Flex
          justify="end"
          className={isMobile ? "mb-2" : "mb-2 mr-5 absolute right-0 "}
        >
          <MyButton size="sm" onClick={() => setIsOpenModal(true)}>
            <PlusOutlined /> Tạo công việc
          </MyButton>
        </Flex>
      )}
      <TableTask reRender={reRender} setReRender={setReRender} />
      <ModalCUTask
        open={isOpenModal}
        onCancel={handleCancelModal}
        onOk={handleOkModal}
      />
    </div>
  );
};

export default Tasks;
