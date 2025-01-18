import React from "react";
import Post from "../components/Post";
import { useQuery } from "@tanstack/react-query";
import tweetServices from "@/services/tweetServices";
import { Spin } from "antd";
import { TweetType } from "@/constant/tweet";
import PropsType from "prop-types";

const PostsGroup = ({ group_id }) => {
  const getPosts = useQuery({
    queryKey: ["getPostsGroup", group_id, 10, 1],
    queryFn: async () =>
      await tweetServices.getPostsByGroup({
        group_id,
        page: 1,
        limit: 10,
      }),
    //refetchInterval: 10000,
  });
  const posts = getPosts?.data?.result;
  console.log(posts);
  return (
    <div className="w-full flex flex-col items-center">
      <Spin spinning={getPosts.isLoading}></Spin>
      {posts?.map((post) => {
        if (post.type === TweetType.TWEET)
          return <Post isShowGroupName={false} key={post._id} post={post} />;
      })}
    </div>
  );
};

PostsGroup.propTypes = {
  group_id: PropsType.string.isRequired,
};
export default PostsGroup;
