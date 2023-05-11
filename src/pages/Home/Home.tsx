import React, { useState } from "react";
import { Box, Stack, Typography, Tooltip } from "@mui/material";
import { Content, SideLeft, SideRight } from "./Home.style";
import Menu from "../../components/Menu";
import PostList from "../../components/PostList";
import InputPost from "../../components/InputPost";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import useModal from "../../hooks/useModal";
import ChatSnackbar from "../../components/ChatSnackbar";

type ReceiverType = {
  _id: string;
  name: string;
  avatar?: string;
};

function Home() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const {
    isOpen: openSnackbar,
    openModal: setOpenSnackbar,
    closeModal: setCloseSnackbar,
  } = useModal();
  const [receiver, setReceiver] = useState<ReceiverType | null>(null);
  const user = useSelector((state: RootState) => state.user.user!);
  const { data } = useQuery({
    queryKey: ["request-list", user?._id],
    queryFn: () => userApi.getListRequestFriend(),
    staleTime: 3 * 60 * 1000,
  });
  const { data: friendList, isLoading: loadingFriendList } = useQuery({
    queryKey: ["friends", user?._id],
    queryFn: () => userApi.getFriendList(user?._id!),
    staleTime: 3 * 60 * 1000,
  });
  const friendListData = friendList?.data.data;
  const { data: getFriendBirthdayToday, isLoading: isLoadingFriendBirthday } =
    useQuery({
      queryKey: ["getFriendBirthdayToday", user?._id],
      queryFn: () => userApi.getFriendBirthdayToday(),
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
        toast.success(data.data.message);
        queryClient.invalidateQueries({
          queryKey: ["request-list", user?._id],
        });
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  const handleDeleteRequest = (requestId: string) => {
    const dataDeleteRequest = {
      requestId: requestId,
      body: {
        status: "declined",
      },
    };
    acceptRequestAddFriendMudation.mutate(dataDeleteRequest, {
      onSuccess: (data) => {
        toast.success(data.data.message);
        queryClient.invalidateQueries({
          queryKey: ["request-list", user?._id],
        });
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  const getFriendBirthdayTodayData = getFriendBirthdayToday?.data.data;
  return (
    <Stack direction={"row"} gap={3} mt="74px">
      <SideLeft>
        <Menu />
      </SideLeft>
      <Content>
        <InputPost />
        <PostList />
      </Content>
      <SideRight>
        <Box sx={{ width: "100%" }}>
          <Typography variant="h3" fontSize="20px" fontWeight="bold" py="10px">
            {t("friend request")}
          </Typography>
          {requestList &&
            requestList.length > 0 &&
            requestList.map((request: any) => {
              const date = moment(request.createdAt);
              moment.locale("vi");
              return (
                <Stack
                  direction="row"
                  key={request._id}
                  gap="10px"
                  sx={{
                    border: "1px solid #eee",
                    width: "100%",
                    padding: "5px 10px",
                    borderRadius: "10px",
                    boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px",
                  }}
                >
                  <GenerateAvatar
                    name={request.requester.name!}
                    avatar={request.requester.avatar}
                  />
                  <Box>
                    <Link
                      to={`/profile/${request.requester._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography fontWeight="bold">
                        {request.requester.name}
                      </Typography>
                    </Link>
                    <Tooltip title={getDate(new Date(request.createdAt))} arrow>
                      <Typography variant="body2">{date.fromNow()}</Typography>
                    </Tooltip>
                    <Button
                      onClick={() => handleAcceptRequest(request._id)}
                      sx={{
                        border: "1px solid #eee",
                        mt: "5px",
                        fontStyle: "italic",
                        backgroundImage: "linear-gradient(#e66465, #9198e5)",
                        color: "#fff",
                      }}
                    >
                      {t("confirm")}
                    </Button>
                    <Button
                      sx={{ backgroundColor: "#9198e5", mt: "5px", ml: "5px" }}
                      onClick={() => handleDeleteRequest(request._id)}
                    >
                      {t("delete")}
                    </Button>
                  </Box>
                </Stack>
              );
            })}

          {isLoadingFriendBirthday ? (
            <div>Loading...</div>
          ) : (
            <>
              {getFriendBirthdayTodayData.length > 0 && (
                <>
                  <Typography
                    variant="h3"
                    fontSize="20px"
                    fontWeight="bold"
                    py="10px"
                  >
                    {t("birthday")}
                  </Typography>
                  <Box display="flex" gap="10px">
                    <i
                      data-visualcompletion="css-img"
                      className="x1b0d499 xl1xv1r"
                      style={{
                        height: 36,
                        width: 36,
                        flexShrink: 0,
                        backgroundImage:
                          'url("https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/vUVPHGoSaS_.png")',
                        backgroundPosition: "0 0",
                        backgroundSize: "38px 214px",
                        backgroundRepeat: "no-repeat",
                        display: "inline-block",
                      }}
                    />
                    <Typography>
                      Hôm nay là sinh nhật của{" "}
                      {getFriendBirthdayTodayData.map((item: any) => (
                        <Link
                          to=""
                          style={{ textDecoration: "none", fontWeight: "bold" }}
                        >
                          {item.name} {" - "}
                        </Link>
                      ))}
                    </Typography>
                  </Box>
                </>
              )}
            </>
          )}
          <Typography variant="h3" fontSize="20px" fontWeight="bold" py="10px">
            {t("contacts")}
          </Typography>
          {friendListData &&
            friendListData.length > 0 &&
            friendListData.map((item: any) => {
              return (
                <Box
                  key={item._id}
                  display="flex"
                  gap="10px"
                  alignItems="center"
                  mb="10px"
                  borderBottom="1px solid #eee"
                  paddingY="5px"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    setOpenSnackbar();
                    setReceiver(item);
                  }}
                >
                  <GenerateAvatar
                    name={item.name}
                    avatar={item.avatar}
                    sx={{ width: "30px", height: "30px", fontSize: "14px" }}
                  />
                  <Typography>{item.name}</Typography>
                </Box>
              );
            })}
          {receiver && (
            <ChatSnackbar
              open={openSnackbar}
              setOpen={setOpenSnackbar}
              setClose={setCloseSnackbar}
              receiver={receiver}
            />
          )}
        </Box>
      </SideRight>
    </Stack>
  );
}

export default Home;
