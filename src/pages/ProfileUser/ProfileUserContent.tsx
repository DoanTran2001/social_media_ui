import { useQuery } from "@tanstack/react-query";
import React from "react";
import postApi from "../../apis/post.api";
import userApi from "../../apis/user.api";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ProfileHead, ProfileImageWrapper } from "../Profile/Profile.style";
import { Avatar, Typography } from "@mui/material";
import { generateNameAvatar } from "../../utils/utils";
import { useTranslation } from "react-i18next";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import WebIcon from "@mui/icons-material/Web";
import InfoIcon from "@mui/icons-material/Info";
import PostItem from "../../components/PostItem";

interface ProfileUserContentProps {
  id: string;
}

function ProfileUserContent({ id }: ProfileUserContentProps) {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => userApi.getUser(id),
  });
  const profileData = data?.data.data;
  console.log("ProfileUserContent ~ profileData:", profileData)

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
            marginTop: "15px",
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
                {/* <AvatarGroup>
              <Avatar sx={{ width: "25px", height: "25px" }} />
              <Avatar sx={{ width: "25px", height: "25px" }} />
              <Avatar sx={{ width: "25px", height: "25px" }} />
              <Avatar sx={{ width: "25px", height: "25px" }} />
            </AvatarGroup> */}
              </Box>
            </ProfileImageWrapper>
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
