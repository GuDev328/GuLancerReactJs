import { useEffect, useState } from "react";
import socket from "@/utils/socket";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import { Avatar, Image, Input, Spin, Upload } from "antd";
import conversationServices from "@/services/conversationServices";
import ControlSendMess from "@/components/business/ControlSendMess";
import Gallery from "@/components/business/Gallery";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { StatusDisputeContext } from "..";
export default function Chat() {
  const { dispute_id } = useParams();
  const [messages, setMessages] = useState([]);
  const [isConnectedSocket, setIsConnectedSocket] = useState(false);
  const { isDisputeCanceled } = useContext(StatusDisputeContext);
  const [pagiantion, setPagination] = useState({
    page: 1,
    total_page: 1,
  });
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      socket.auth = {
        access_token: localStorage.getItem("accessToken"),
      };
      socket.connect();
      setIsConnectedSocket(true);
      socket.on("disconnect", () => {
        socket.emit("leaveRoomDisputeChat", dispute_id);
        setIsConnectedSocket(false);
        console.log("socket disconnected");
      });
      socket.emit("joinRoomDisputeChat", dispute_id);
      socket.on("connect_error", (err) => {
        setIsConnectedSocket(false);
        console.log(err);
      });

      socket.off("chatDisputeUpdated");
      socket.on("chatDisputeUpdated", (data) => {
        setMessages((messages) => [
          {
            sender_id: data.sender_id,
            receiver_id: data.receiver_id,
            content: data.content,
            medias: data.medias,
            sender_info: data.sender_info,
          },
          ...messages,
        ]);
      });

      fetchFirstMessage();

      return () => {
        socket.emit("leaveRoomDisputeChat", dispute_id);
        socket.disconnect();
        setIsConnectedSocket(false);
      };
    } else {
      window.location.href = "/login";
    }
  }, []);

  const fetchFirstMessage = async () => {
    const info = await conversationServices.getProjectConversation(
      dispute_id,
      20,
      1
    );
    setMessages(info.result);
    setPagination({
      total_page: info.total_page,
      page: info.page,
    });
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = (value, medias) => {
    socket.emit("newDisputeChat", dispute_id, {
      sender_id: user._id,
      receiver_id: dispute_id,
      content: value,
      medias: medias,
      sender_info: user,
    });
  };

  const fetchMoreMessages = async () => {
    if (dispute_id && pagiantion.page < pagiantion.total_page) {
      const info = await conversationServices.getProjectConversation(
        dispute_id,
        20,
        pagiantion.page + 1
      );
      setMessages((messages) => [...messages, ...info.result]);
      setPagination({
        total_page: info.total_page,
        page: info.page,
      });
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-col bg-white justify-end items-center h-[calc(100vh-300px)]">
          <div
            className=""
            id="scrollableDiv"
            style={{
              width: "98%",

              overflow: "auto",
              display: "flex",
              flexDirection: "column-reverse",
            }}
          >
            <InfiniteScroll
              className=""
              dataLength={messages.length}
              next={fetchMoreMessages}
              style={{
                display: "flex",
                flexDirection: "column-reverse",
              }}
              inverse={true}
              hasMore={pagiantion.page < pagiantion.total_page}
              loader={<Spin spinning={true} />}
              scrollableTarget="scrollableDiv"
            >
              {messages.map((message) => (
                <div key={message._id} className="">
                  {!(message.sender_id === user._id) ? (
                    <div className="w-1/2 flex ">
                      <div className="mr-1">
                        <Avatar src={message?.sender_info?.avatar} size={40} />
                      </div>

                      <div>
                        <div className="text-sm text-blue-gray-500">
                          {message?.sender_info?.name}
                        </div>
                        <div className="bg-blue-500 flex flex-col text-white block p-2 rounded-md float-start">
                          {message.medias.length > 0 && (
                            <Gallery medias={message.medias} />
                          )}
                          <p className="text-sm break-words inline-block">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-1/2 float-end">
                      <div className="bg-blue-500 flex flex-col text-white block p-2 rounded-md float-end m-1">
                        {message.medias.length > 0 && (
                          <Gallery medias={message.medias} />
                        )}
                        <p className="text-sm break-words inline-block">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </InfiniteScroll>
          </div>
          {!isDisputeCanceled && (
            <div className="w-[95%] ">
              <ControlSendMess onSubmit={handleSubmit} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

Chat.propTypes = {
  projectId: PropTypes.string.isRequired,
};
