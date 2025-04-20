import { Spin } from 'antd';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TweetType } from './../../../../constant/tweet';
import Post from '../components/Post';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import tweetServices  from '@/services/tweetServices';

const PendingPostsTab = () => {
  const [posts, setPosts] = useState([]);
  const {id} = useParams();
  const [pageInfo, setPageInfo] =useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalRecord: 0
  }) 

  const fetchFirstMessage = async () => {
    const info = await tweetServices.getPostsPendingByGroup({
      group_id: id,
      page: pageInfo.page,
      limit: pageInfo.limit,
    })
    setPosts(info.result);
    setPageInfo((pre)=>({
      ...pre,
      totalPages: info.total_page,
      page: info.page,
    }));
  };

  useEffect(()=>{
    fetchFirstMessage();
  }, []);

  const fetchMoreMessages = async () => {
    if ( pageInfo.page < pageInfo.totalPages) {
      const info = await tweetServices.getPostsPendingByGroup({
              group_id: id,
              page: pageInfo.page + 1,
              limit: pageInfo.limit,
            })
      setPosts((posts) => [...posts, ...info.result]);
      setPageInfo((pre)=>({
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
                  if (post.type === TweetType.TWEET)
                    return <Post isAdmin isShowGroupName={false} key={post._id} post={post} />;
                })}
              </InfiniteScroll>
     </div>
    </div>
  );
};

export default PendingPostsTab;
