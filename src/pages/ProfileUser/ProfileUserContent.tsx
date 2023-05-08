import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import postApi from "../../apis/post.api";
import userApi from "../../apis/user.api";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ProfileHead, ProfileImageWrapper } from "../Profile/Profile.style";
import { Avatar, Button, Typography } from "@mui/material";
import { generateNameAvatar } from "../../utils/utils";
import { useTranslation } from "react-i18next";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import WebIcon from "@mui/icons-material/Web";
import InfoIcon from "@mui/icons-material/Info";
import PostItem from "../../components/PostItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import useModal from "../../hooks/useModal";
import ChatSnackbar from "../../components/ChatSnackbar";

interface ProfileUserContentProps {
  id: string;
}

type ReceiverType = {
  _id: string;
  name: string;
  avatar?: string;
};

function ProfileUserContent({ id }: ProfileUserContentProps) {
  const { t } = useTranslation();
  const [receiver, setReceiver] = useState<ReceiverType | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => userApi.getUser(id),
  });
  const {
    isOpen: openSnackbar,
    openModal: setOpenSnackbar,
    closeModal: setCloseSnackbar,
  } = useModal();
  const profileData = data?.data.data;
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Box
          width={"100%"}
          sx={{
            border: "1px solid #eee",
            borderRadius: "10px",
          }}
          px="10px"
          py="15px"
        >
          <ProfileHead>
            <ProfileImageWrapper>
              <Box>
                {profileData?.avatar ? (
                  <Avatar
                    sx={{ width: "100px", height: "100px" }}
                    src={profileData?.avatar}
                  />
                ) : (
                  <Avatar
                    sx={{ width: "100px", height: "100px", fontSize: "40px" }}
                  >
                    {generateNameAvatar(profileData?.name! as string)}
                  </Avatar>
                )}
              </Box>
              <Box>
                <Typography variant="h3" fontSize={20} fontWeight="bold">
                  {profileData?.name!}
                </Typography>
                <Typography>
                  {profileData?.friends?.length} {t("friend")}
                </Typography>
              </Box>
            </ProfileImageWrapper>
            <Box display="flex" gap="10px">
              {user?.friends
                ?.map((friend) => friend._id)
                .includes(profileData._id) ? (
                <>
                  <Button
                    sx={{
                      background: "#E4E6EB",
                      color: "#051B1B",
                      padding: "5px 10px",
                      "&:hover": {
                        background: "#e4e6ebc9",
                      },
                    }}
                  >
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/ye/r/c9BbXR9AzI1.png"
                      alt=""
                      style={{
                        width: "16px",
                        height: "16px",
                        marginRight: "10px",
                      }}
                    />
                    Bạn bè
                  </Button>
                  <Button
                    sx={{
                      background: "#1B74E4",
                      color: "#fff",
                      padding: "5px 10px",
                      "&:hover": {
                        background: "#1b75e4b0",
                      },
                    }}
                    onClick={() => {
                      setOpenSnackbar();
                      setReceiver({
                        _id: profileData._id,
                        name: profileData.name,
                        avatar: profileData.avatar,
                      });
                    }}
                  >
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/1z-5F6qDswz.png"
                      alt=""
                      style={{
                        width: "16px",
                        height: "16px",
                        marginRight: "10px",
                        color: "white",
                      }}
                    />
                    Nhắn tin
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    sx={{
                      background: "#1B74E4",
                      color: "#fff",
                      padding: "5px 10px",
                      "&:hover": {
                        background: "#1b75e4b0",
                      },
                    }}
                  >
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/ImGMiWz-mEy.png"
                      alt=""
                      style={{
                        width: "16px",
                        height: "16px",
                        marginRight: "10px",
                      }}
                    />
                    Thêm bạn bè
                  </Button>
                  <Button
                    sx={{
                      background: "#E4E6EB",
                      color: "#051B1B",
                      padding: "5px 10px",
                      "&:hover": {
                        background: "#e4e6ebc9",
                      },
                    }}
                    onClick={() => {
                      setOpenSnackbar();
                      setReceiver({
                        _id: profileData._id,
                        name: profileData.name,
                        avatar: profileData.avatar,
                      });
                    }}
                  >
                    <img
                      src="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/1z-5F6qDswz.png"
                      alt=""
                      style={{
                        width: "16px",
                        height: "16px",
                        marginRight: "10px",
                        color: "white",
                      }}
                    />
                    Nhắn tin
                  </Button>
                </>
              )}
              {receiver && (
                <ChatSnackbar
                  open={openSnackbar}
                  setOpen={setOpenSnackbar}
                  setClose={setCloseSnackbar}
                  receiver={receiver}
                />
              )}
            </Box>
          </ProfileHead>
          <Box
            marginBottom="20px"
            maxWidth={700}
            margin="0 auto"
            border="2px solid #14a952"
            px="5px"
            py="10px"
            borderRadius={3}
          >
            <Box display="flex" gap="5px" mb="3px">
              <PersonIcon />
              <Typography>{profileData?.name}</Typography>
            </Box>
            {profileData?.address && (
              <Box display="flex" gap="5px" mb="3px">
                <HomeIcon />
                <Typography>{profileData?.address}</Typography>
              </Box>
            )}
            {profileData?.phone && (
              <Box display="flex" gap="5px" mb="3px">
                <PhoneIcon />
                <Typography>{profileData?.phone}</Typography>
              </Box>
            )}
            <Box display="flex" gap="5px" mb="3px">
              <WebIcon />
              <a href="https://cssgradient.io/blog/css-gradient-text/">
                sdfsdfsd
              </a>
            </Box>
            {profileData?.bio && (
              <Box display="flex" gap="5px">
                <InfoIcon />
                <Typography>{profileData?.bio}</Typography>
              </Box>
            )}
          </Box>
          <Divider sx={{ marginY: "20px" }} />
          <div>
            {profileData &&
              profileData.posts.length > 0 &&
              profileData.posts.map((item: any) => {
                // if (user?._id !== item.author._id) {
                //   return <PostItem key={item._id} data={item} shared />;
                // }
                return <PostItem key={item._id} data={item} />;
              })}
          </div>
        </Box>
      )}
    </>
  );
}

export default ProfileUserContent;
