import { Spin } from "antd";
import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import { useParams } from "react-router-dom";
import tweetServices from "@/services/tweetServices";
import { TweetType } from "./../../../constant/tweet";
import Post from "./../../Client/Community/components/Post/index";
import UserName from "./../../../components/business/UserName";

const PostsTab = () => {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalRecord: 0,
  });

  const fetchFirstMessage = async () => {
    const info = await tweetServices.getReports({
      page: pageInfo.page,
      limit: pageInfo.limit,
    });
    setPosts(info.result);
    setPageInfo((pre) => ({
      ...pre,
      totalPages: info.total_page,
      page: info.page,
    }));
  };

  useEffect(() => {
    fetchFirstMessage();
  }, []);

  const fetchMoreMessages = async () => {
    if (pageInfo.page < pageInfo.totalPages) {
      const info = await tweetServices.getReports({
        page: pageInfo.page + 1,
        limit: pageInfo.limit,
      });
      setPosts((posts) => [...posts, ...info.result]);
      setPageInfo((pre) => ({
        ...pre,
        totalPages: info.total_page,
        page: info.page,
      }));
    }
  };
  useEffect(() => {
    fetchFirstMessage();
  }, []);

  return (
    <div className="w-full bg-blue-gray-50 flex flex-col items-center">
      <div id="scrollableDiv" className="w-full no-scrollbar">
        <InfiniteScroll
          className="w-full flex flex-col items-center overflow-hidden no-scrollbar"
          dataLength={posts.length}
          next={fetchMoreMessages}
          hasMore={pageInfo.page < pageInfo.totalPages}
          loader={<Spin spinning={true} />}
        >
          {posts?.map((post) => {
            return (
              <div key={post._id} className="w-full flex justify-center ">
                <div className="w-full flex flex-col items-center">
                  <Post
                    isAdmin
                    key={post._id}
                    post={{
                      ...post.tweet,
                      group: [post.group],
                      user: post.tweet_author,
                    }}
                    reportInfo={{
                      user: post.reporter_info,
                      description: post.description,
                      id: post._id,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default PostsTab;
