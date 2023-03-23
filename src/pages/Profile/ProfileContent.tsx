import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import WebIcon from "@mui/icons-material/Web";
import InfoIcon from "@mui/icons-material/Info";
import {
  ModalContentContainer,
  ProfileHead,
  ProfileImageWrapper,
} from "./Profile.style";
import useModal from "../../hooks/useModal";
import EditProfile from "../../components/EditProfile";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { generateNameAvatar } from "../../utils/utils";
import { Divider } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import postApi from "../../apis/post.api";
import PostItem from "../../components/PostItem";

function ProfileContent() {
  const {
    isOpen: openEditProfile,
    openModal: openModalEditProfile,
    closeModal: closeModalEditProfile,
  } = useModal();
  const user = useSelector((state: RootState) => state.user);
  const { data } = useQuery({
    queryKey: ["posts_by_user"],
    queryFn: () => postApi.getPostByUser(),
    staleTime: 3 * 60 * 1000,
  });
  const dataPost = data?.data.data;
  console.log("ProfileContent ~ dataPost:", dataPost)
  return (
    <Box
      width={"100%"}
      sx={{ border: "1px solid #eee", borderRadius: "10px", marginTop: "15px" }}
      px="10px"
      py="15px"
    >
      <Typography variant="h2" fontSize={25} textAlign="center" pb={3}>
        Tài khoản của tôi
      </Typography>
      <ProfileHead>
        <ProfileImageWrapper>
          <Box>
            {user?.avatar ? (
              <Avatar
                sx={{ width: "100px", height: "100px" }}
                src={user.avatar}
              />
            ) : (
              <Avatar
                sx={{ width: "100px", height: "100px", fontSize: "40px" }}
              >
                {generateNameAvatar(user?.name! as string)}
              </Avatar>
            )}
          </Box>
          <Box>
            <Typography variant="h3" fontSize={20} fontWeight="bold">
              Đoan Trần
            </Typography>
            <Typography>515 bạn bè</Typography>
            <AvatarGroup>
              <Avatar sx={{ width: "25px", height: "25px" }} />
              <Avatar sx={{ width: "25px", height: "25px" }} />
              <Avatar sx={{ width: "25px", height: "25px" }} />
              <Avatar sx={{ width: "25px", height: "25px" }} />
            </AvatarGroup>
          </Box>
        </ProfileImageWrapper>
        <Button onClick={openModalEditProfile}>Chỉnh sửa trang cá nhân</Button>
        <Modal
          open={openEditProfile}
          onClose={closeModalEditProfile}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ModalContentContainer>
            <EditProfile />
          </ModalContentContainer>
        </Modal>
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
          <Typography>{user?.name}</Typography>
        </Box>
        <Box display="flex" gap="5px" mb="3px">
          <HomeIcon />
          <Typography>{user?.address}</Typography>
        </Box>
        <Box display="flex" gap="5px" mb="3px">
          <PhoneIcon />
          <Typography>{user?.phone}</Typography>
        </Box>
        <Box display="flex" gap="5px" mb="3px">
          <WebIcon />
          <a href="https://cssgradient.io/blog/css-gradient-text/">sdfsdfsd</a>
        </Box>
        <Box display="flex" gap="5px">
          <InfoIcon />
          <Typography>{user?.bio}</Typography>
        </Box>
      </Box>
      <Divider sx={{ marginY: "20px" }} />
      <Box>
        <NavLink to={"/"}>Bài viết</NavLink>
        <NavLink to={"/"}>Bạn bè</NavLink>
      </Box>
      <div>
        {dataPost &&
          dataPost.length > 0 &&
          dataPost.map((item: any) => <PostItem data={item} />)}
      </div>
    </Box>
  );
}

export default ProfileContent;
