import { useQuery } from "@tanstack/react-query";
import React from "react";
import postApi from "../../apis/post.api";
import { PostData } from "../../types/post.type";
import PostItem from "../PostItem";
import { Box, Skeleton, Stack } from "@mui/material";

function PostList() {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => postApi.getPostFromFriends(),
    staleTime: 3 * 60 * 1000,
  });
  const dataPost = data?.data.data;
  return (
    <div>
      {isLoading && (
        <>
          <Stack padding={"10px"} gap="10px" mb="15px">
            <Box display={"flex"} gap="10px">
              <Skeleton variant="circular" width={40} height={40} />
              <Box>
                <Skeleton
                  variant="rectangular"
                  width={150}
                  height={20}
                  sx={{ mb: "5px" }}
                />
                <Skeleton variant="rectangular" width={170} height={20} />
              </Box>
            </Box>
            <Skeleton variant="rounded" width={"100%"} height={60} />
            <Stack direction={"row"} gap="10px">
              <Skeleton variant="rounded" width={"30px"} height={"30px"} />
              <Skeleton variant="rounded" width={"30px"} height={"30px"} />
              <Skeleton variant="rounded" width={"30px"} height={"30px"} />
            </Stack>
          </Stack>
          <Stack padding={"10px"} gap="10px">
            <Box display={"flex"} gap="10px">
              <Skeleton variant="circular" width={40} height={40} />
              <Box>
                <Skeleton
                  variant="rectangular"
                  width={150}
                  height={20}
                  sx={{ mb: "5px" }}
                />
                <Skeleton variant="rectangular" width={170} height={20} />
              </Box>
            </Box>
            <Skeleton variant="rounded" width={"100%"} height={60} />
            <Stack direction={"row"} gap="10px">
              <Skeleton variant="rounded" width={"30px"} height={"30px"} />
              <Skeleton variant="rounded" width={"30px"} height={"30px"} />
              <Skeleton variant="rounded" width={"30px"} height={"30px"} />
            </Stack>
          </Stack>
        </>
      )}
      {dataPost &&
        dataPost.length > 0 &&
        dataPost.map((item) => <PostItem data={item} key={item._id} />)}
    </div>
  );
}

export default PostList;
