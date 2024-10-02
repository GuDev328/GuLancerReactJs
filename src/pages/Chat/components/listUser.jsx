import React, { useEffect, useState } from "react";
import conversationServices from "../../../services/conversationServices";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ListChatUser = ({ receiver, setReceiver }) => {
    const [chatUsers, setChatUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const userId = useSelector((state) => state.user.userInfo._id);
    const limit = 10;
    useEffect(() => {
        const fetchChatUsers = async () => {
            setLoading(true);
            const response = await conversationServices.getChatUsers(
                userId,
                limit,
                page
            );
            setChatUsers(response.result);
            setTotalPage(response.total_page);
            setLoading(false);
        };

        fetchChatUsers();
    }, [userId, limit, page]);
    return (
        <div>
            <div className="flex flex-col">
                {chatUsers.map((user) => (
                    <div
                        key={user._id}
                        onClick={() => setReceiver(user.chat_with)}
                        className={
                            (receiver === user.chat_with
                                ? "bg-main"
                                : "bg-white") +
                            " flex mb-1 items-center p-2 rounded-md w-full justify-between"
                        }
                    >
                        <div className="flex  items-center">
                            <img
                                src={user.user.avatar}
                                alt={user.user.name}
                                className="w-10 h-10 rounded-full"
                            />
                            <span
                                className={
                                    (receiver === user.chat_with
                                        ? "text-white font-bold"
                                        : "text-black") +
                                    " hidden lg:block ml-2"
                                }
                            >
                                {user.user.name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

ListChatUser.propTypes = {
    receiver: PropTypes.string,
    setReceiver: PropTypes.func,
};

export default ListChatUser;
