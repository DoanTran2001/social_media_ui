import React from "react";
import { PostData } from "../../types/post.type";
import Box from "@mui/material/Box";
import GenerateAvatar from "../GenerateAvatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { randomGradient } from "../../utils/utils";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import userApi from "../../apis/user.api";
import { toast } from "react-toastify";

interface SaveItemProps {
  data: PostData;
}

function SaveItem({ data }: SaveItemProps) {
  const { t } = useTranslation();
  const unSavedPostMutation = useMutation({
    mutationFn: (data: { savedId: string; postId: string }) => {
      return userApi.unSavedPost(data);
    },
  });
  const unsavedPost = () => {
    const dataSavedPost = { savedId: data.savedKey as string, postId: data._id };
    unSavedPostMutation.mutate(dataSavedPost, {
      onSuccess: (data) => {
        toast.success(data.data.message);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  return (
    <Box
      sx={{
        border: "1px solid #eee",
        padding: "5px 10px",
        borderRadius: "10px",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        mb: "15px",
        backgroundImage: randomGradient("to bottom"),
      }}
    >
      <Box>
        <Box display="flex" gap="10px" mb="5px">
          <GenerateAvatar name={data.author.name} avatar={data.author.avatar} />
          <Box>
            <Typography fontWeight={600} fontSize="15px">
              Đã lưu từ <Link to="">bài viết của {data.author.name}</Link>
            </Typography>
            <Typography fontWeight={500} fontSize="15px">
              {t("posts")} . {t("save to")}{" "}
              <Link to={`/saved?key=${data.savedKey}`}>{data.savedKey}</Link>
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box mb="5px">
          <Typography
            dangerouslySetInnerHTML={{
              __html: data.content,
            }}
          ></Typography>
        </Box>
        <Divider sx={{ mb: "5px" }} />
        <Button
          sx={{
            background: "#3A3B3C",
            color: "#E4E6EB",
            fontSize: "13px",
            textTransform: "inherit",
            minWidth: "250px",
            mr: "15px",
          }}
        >
          {t("add to collection")}
        </Button>
        <Button
          sx={{
            background: "#3A3B3C",
            color: "#E4E6EB",
            fontSize: "13px",
            textTransform: "inherit",
            minWidth: "100",
          }}
          onClick={unsavedPost}
        >
          {t("unsave")}
        </Button>
      </Box>
    </Box>
  );
}

export default SaveItem;
