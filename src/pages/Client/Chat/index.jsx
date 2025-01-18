import { useEffect, useState } from "react";
import socket from "@/utils/socket";
import InfiniteScroll from "react-infinite-scroll-component";
import ListChatUser from "./components/listUser";
import Header from "../Layout/components/Header";
import { Avatar, Image, Input, Spin, Upload } from "antd";
import conversationServices from "@/services/conversationServices";
import ControlSendMess from "@/components/business/ControlSendMess";
import Gallery from "@/components/business/Gallery";

export default function Chat() {
  const [receiver, setReceiver] = useState("");
  const [messages, setMessages] = useState([]);
  const [avatarUserCurrent, setAvatarUserCurrent] = useState("");
  const [isConnectedSocket, setIsConnectedSocket] = useState(false);
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
        setIsConnectedSocket(false);
        console.log("socket disconnected");
      });
      socket.on("connect_error", (err) => {
        setIsConnectedSocket(false);
        console.log(err);
      });
      return () => {
        socket.disconnect();
        setIsConnectedSocket(false);
      };
    } else {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    socket.off("receiver-chat");
    socket.on("receiver-chat", (data) => {
      if (data.sender_id === receiver) {
        setMessages((messages) => [
          {
            sender_id: data.sender_id,
            receiver_id: data.receiver_id,
            content: data.content,
            medias: data.medias,
          },
          ...messages,
        ]);
      }
    });
    if (receiver) {
      fetchFirstMessage();
    }
  }, [receiver]);

  const fetchFirstMessage = async () => {
    const info = await conversationServices.getConversation(receiver, 20, 1);
    setMessages(info.result);
    setPagination({
      total_page: info.total_page,
      page: info.page,
    });
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = (value, medias) => {
    socket.emit("chat", {
      sender_id: user._id,
      receiver_id: receiver,
      content: value,
      medias: medias,
    });
    if (isConnectedSocket) {
      setMessages((messages) => [
        {
          sender_id: user._id,
          receiver_id: receiver,
          content: value,
          medias: medias,
        },
        ...messages,
      ]);
    }
  };

  const fetchMoreMessages = async () => {
    if (receiver && pagiantion.page < pagiantion.total_page) {
      const info = await conversationServices.getConversation(
        receiver,
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
      <Header />
      <div
        style={{ height: "calc(100vh - 60px)" }}
        className="flex box-border "
      >
        <div
          style={{ height: "calc(100vh - 60px)" }}
          className="flex bg-white p-3 overflow-y-scroll flex-col border-r-2 border-gray-300 w-1/5 h-screen"
        >
          <ListChatUser
            setAvatarUserCurrent={setAvatarUserCurrent}
            receiver={receiver}
            setReceiver={setReceiver}
          />
        </div>

        {receiver && (
          <div
            style={{ height: "calc(100vh - 60px)" }}
            className="flex flex-col bg-white justify-end items-center w-4/5 h-screen"
          >
            <div
              className=""
              id="scrollableDiv"
              style={{
                width: "98%",
                //height: "calc(100vh - 150px)",
                overflow: "auto",
                display: "flex",
                flexDirection: "column-reverse",
              }}
            >
              {/*Put the scroll bar always on the bottom*/}
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
                          <Avatar src={avatarUserCurrent} size={40} />
                        </div>
                        <div className="bg-blue-500 flex flex-col text-white block p-2 rounded-md float-start m-1">
                          {message.medias.length > 0 && (
                            <Gallery medias={message.medias} />
                          )}
                          <p className="text-sm break-words inline-block">
                            {message.content}
                          </p>
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
            <div className="w-[95%] ">
              <ControlSendMess onSubmit={handleSubmit} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
