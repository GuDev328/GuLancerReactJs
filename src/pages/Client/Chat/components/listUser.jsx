import React, { useEffect, useState } from "react";
import conversationServices from "@/services/conversationServices";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { formatTimeVi } from "../../../../utils/common";

const ListChatUser = ({ receiver, setReceiver, setAvatarUserCurrent }) => {
  const [chatUsers, setChatUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.user.userInfo._id);
  const fetchChatUsers = async () => {
    setLoading(true);
    const response = await conversationServices.getChatUsers();
    setChatUsers(response.result);
    setLoading(false);
  };
  useEffect(() => {
    const itvId = setInterval(() => {
      fetchChatUsers();
    }, 2000);
    return () => {
      clearInterval(itvId);
    };
  }, [userId]);
  return (
    <div className="bg-white ">
      <div className="text-xl font-bold">Đoạn chat</div>
      <div className="flex flex-col">
        {chatUsers.map((user) => {
          console.log(userId);
          const receiver_id =
            user.user_id_1 === userId ? user.user_id_2 : user.user_id_1;
          const receiver_info =
            user.user_id_1 === userId
              ? user.user_2_info[0]
              : user.user_1_info[0];
          console.log(receiver_id, receiver_info);
          return (
            <div
              key={user._id}
              onClick={() => {
                setReceiver(receiver_id);
                setAvatarUserCurrent(receiver_info.avatar);
              }}
              className={
                (receiver === receiver_id
                  ? "bg-main"
                  : "bg-white bg-gray-100") +
                " flex mb-1 items-center relative p-2 rounded-md w-full justify-between"
              }
            >
              <div className="flex  items-center">
                <img
                  src={receiver_info.avatar}
                  alt={receiver_info.name}
                  className="w-10 h-10 rounded-full"
                />
                <p
                  className={
                    (receiver === receiver_id
                      ? "text-white font-bold"
                      : "text-black") + " hidden md:block ml-2"
                  }
                >
                  {receiver_info.name}
                </p>
              </div>
              {receiver !== receiver_id && (
                <>
                  <p className="absolute top-1 text-[#333] right-1 text-[12px]">
                    {formatTimeVi(user.last_message.time)}
                  </p>

                  <p className="absolute bottom-0 text-[#333] right-1 text-[12px]">
                    {user.last_message.message}
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

ListChatUser.propTypes = {
  receiver: PropTypes.string,
  setReceiver: PropTypes.func,
  setAvatarUserCurrent: PropTypes.func,
};

export default ListChatUser;
