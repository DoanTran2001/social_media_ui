import React from "react";
import { Box, Stack, Typography, Tooltip } from "@mui/material";
import { Content, SideLeft, SideRight } from "./Home.style";
import Menu from "../../components/Menu";
import PostList from "../../components/PostList";
import InputPost from "../../components/InputPost";
import { useMutation, useQuery } from "@tanstack/react-query";
import userApi from "../../apis/user.api";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import GenerateAvatar from "../../components/GenerateAvatar";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "../../locales/vi/moment";
import { getDate } from "../../utils/utils";

function Home() {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.user);
  const { data } = useQuery({
    queryKey: ["request-list", user?._id],
    queryFn: () => userApi.getListRequestFriend(),
    staleTime: 3 * 60 * 1000,
  });
  const acceptRequestAddFriendMudation = useMutation({
    mutationFn: (data: { requestId: string; body: any }) =>
      userApi.responseRequestAddFriend(data.requestId, data.body),
  });
  const requestList = data?.data.data;
  const handleAcceptRequest = (requestId: string) => {
    const dataAcceptRequest = {
      requestId: requestId,
      body: {
        status: "accepted",
      },
    };
    acceptRequestAddFriendMudation.mutate(dataAcceptRequest, {
      onSuccess: (data) => {
        console.log(data);
        toast.success(data.data.message);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  return (
    <Stack direction={"row"} gap={3}>
      <SideLeft>
        <Menu />
      </SideLeft>
      <Content>
        <InputPost />
        <PostList />
      </Content>
      <SideRight>
        <Box sx={{ width: '100%'}}>
          <Typography variant="h3" fontSize="20px" fontWeight="bold" py="10px">
            {t("friend request")}
          </Typography>
          {requestList &&
            requestList.length > 0 &&
            requestList.map((request: any) => {
              const date = moment(request.createdAt);
              moment.locale("vi");
              return (
                <Stack direction="row" key={request._id} gap="10px" sx={{
                  border: '1px solid #eee',
                  width: '100%',
                  padding: '5px 10px',
                  borderRadius: '10px',
                  boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px'
                }}>
                  <GenerateAvatar
                    name={request.requester.name!}
                    avatar={request.requester.avatar}
                  />
                  <Box>
                    <Link to={`/profile/${request.requester._id}`} style={{ textDecoration: "none" }}>
                      <Typography fontWeight="bold">
                        {request.requester.name}
                      </Typography>
                    </Link>
                    <Tooltip title={getDate(new Date(request.createdAt))} arrow>
                      <Typography variant="body2">{date.fromNow()}</Typography>
                    </Tooltip>
                    <Button onClick={() => handleAcceptRequest(request._id)} sx={{
                      border: '1px solid #eee',
                      mt: '5px',
                      fontStyle: 'italic',
                      backgroundImage: 'linear-gradient(#e66465, #9198e5)',
                      color: '#fff'
                    }}>
                      Xác nhận
                    </Button>
                  </Box>
                </Stack>
              );
            })}
        </Box>
      </SideRight>
    </Stack>
  );
}

export default Home;
