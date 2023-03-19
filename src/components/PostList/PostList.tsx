import { useQuery } from "@tanstack/react-query";
import React from "react";
import postApi from "../../apis/post.api";
import { PostData } from "../../types/post.type";
import PostItem from "../PostItem";

function PostList() {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: () => postApi.getPostFromFriends(),
    staleTime: 3 * 60 * 1000,
  });
  const dataPost = data?.data.data;
  console.log("PostList ~ dataPost:", dataPost);
  return (
    <div>
      {dataPost && dataPost.length > 0 &&
        dataPost.map((item) => <PostItem data={item} />)}
    </div>
  );
}

export default PostList;
