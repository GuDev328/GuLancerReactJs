import React from "react";
import Post from "../components/Post";
import { useQuery } from "@tanstack/react-query";
import tweetServices from "@/services/tweetServices";
import { Spin } from "antd";
import { TweetType } from "@/constant/tweet";

const Posts = () => {
  const getNewFeeds = useQuery({
    queryKey: ["getNewFeeds", 10, 1],
    queryFn: async () =>
      await tweetServices.getNewFeeds({
        page: 1,
        limit: 10,
      }),
    //refetchInterval: 10000,
  });
  const posts = getNewFeeds?.data?.result;
  return (
    <div className="w-full flex flex-col items-center">
      <Spin spinning={getNewFeeds.isLoading}></Spin>
      {posts?.map((post) => {
        if (post.type === TweetType.TWEET)
          return <Post key={post._id} post={post} />;
      })}
    </div>
  );
};

export default Posts;
