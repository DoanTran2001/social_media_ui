import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box/Box";
import moment from "moment";
import "../../locales/vi/moment";
import { Popover, TextField, Tooltip } from "@mui/material";
import { getDate } from "../../utils/utils";
import { useTranslation } from "react-i18next";
import { locales } from "../../i18n/i18n";
import GenerateAvatar from "../GenerateAvatar";
import { path } from "../../constants/path";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import usePopover from "../../hooks/usePopover";
import { MouseEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import commentsApi from "../../apis/comments.api";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { toast } from "react-toastify";

interface CommentItemProps {
  name: string;
  content: string;
  createdAt: string;
  avatar: string;
  idUser: string;
  postId: string;
  commentId: string;
  reply?: boolean;
  replyId?: string;
  setOpenReply: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentContent = styled("div")(() => ({
  "& a": {
    textDecoration: "none",
    listStyle: "none",
    fontWeight: 600,
  },
}));

function CommentItem({
  name,
  content,
  createdAt,
  avatar,
  idUser,
  postId,
  commentId,
  reply,
  replyId,
  setOpenReply,
}: CommentItemProps) {
  const queryClient = useQueryClient();
  const userId = useSelector((state: RootState) => state.user.user?._id);
  const [editComment, setEditComment] = useState(false);
  const [editValue, setEditValue] = useState(content);
  const { t, i18n } = useTranslation();
  const currentLanguage = locales[i18n.language as keyof typeof locales];
  if (currentLanguage === "Tiếng Việt") {
    moment.locale("vi");
  } else {
    moment.locale("en");
  }
  const date = moment(createdAt);
  const editCommentMudation = useMutation({
    mutationFn: (data: {
      idPost: string;
      idComment: string;
      body: { content: string };
    }) => commentsApi.editComment(data.idPost, data.idComment, data.body),
  });
  const editReplyCommentMutation = useMutation({
    mutationFn: (data: {
      postId: string;
      commentId: string;
      subcommentId: string;
      body: { content: string };
    }) =>
      commentsApi.editReplyComment(
        data.postId,
        data.commentId,
        data.subcommentId,
        data.body
      ),
  });
  const deleteCommentMutation = useMutation({
    mutationFn: (data: {
      postId: string;
      commentId: string;
    }) =>
      commentsApi.deleteComment(data.postId, data.commentId),
  });
  const deleteReplyCommentMutation = useMutation({
    mutationFn: (data: {
      postId: string;
      commentId: string;
      replyId: string;
    }) =>
      commentsApi.deleteReplyComment(data.postId, data.commentId, data.replyId),
  });
  const {
    id: idMore,
    open: openMore,
    handleClick: setOpenMore,
    handleClose: setCloseMore,
    anchorEl,
  } = usePopover({ idProps: createdAt });
  const handleEditComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataEditComment = {
      idPost: postId,
      idComment: commentId,
      body: {
        content: editValue,
      },
    };
    if (reply) {
      const dataEditReplyComment = {
        postId,
        commentId,
        subcommentId: replyId as string,
        body: { content: editValue },
      };
      editReplyCommentMutation.mutate(dataEditReplyComment, {
        onSuccess: (data) => {
          setEditComment(false);
          setCloseMore();
          queryClient.invalidateQueries({
            queryKey: ["commentsPost", dataEditComment.idPost],
          });
        },
      });
    } else {
      editCommentMudation.mutate(dataEditComment, {
        onSuccess: (data) => {
          setEditComment(false);
          setCloseMore();
          queryClient.invalidateQueries({
            queryKey: ["commentsPost", dataEditComment.idPost],
          });
        },
      });
    }
  };
  const handleDelete = () => {
    if(reply) {
      const dataDeleteReplyComment = {
        postId,
        commentId,
        replyId: replyId as string,
      };
      deleteReplyCommentMutation.mutate(dataDeleteReplyComment, {
        onSuccess: (data) => {
          console.log(data);
          setCloseMore();
          queryClient.invalidateQueries({
            queryKey: ["commentsPost", dataDeleteReplyComment.postId],
          });
        },
      });
    } else {
      const dataDeleteComment = {
        postId,
        commentId,
      }
      deleteCommentMutation.mutate(dataDeleteComment, {
        onSuccess: (data) => {
          toast.success(data.data.message)
          setCloseMore();
          queryClient.invalidateQueries({
            queryKey: ["commentsPost", dataDeleteComment.postId],
          });
        }
      })
    }
  };
  return (
    <Stack direction={"row"} gap={"5px"} mb="5px">
      <GenerateAvatar
        name={name}
        avatar={avatar}
        sx={{ width: "25px", height: "25px" }}
      />
      {editComment ? (
        <form autoComplete="off" onSubmit={handleEditComment}>
          <TextField
            size="small"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
        </form>
      ) : (
        <CommentContent>
          <Link to={path.profileUser.replace(/:id/, idUser)}>{name}</Link>
          <Typography lineHeight={1.2}>{content}</Typography>
          <Box display={"flex"} alignItems="center" gap="10px">
            <Typography
              variant="body2"
              fontSize={"12px"}
              fontWeight="bold"
              fontStyle={"italic"}
              sx={{ cursor: "pointer" }}
              onClick={() => setOpenReply(true)}
            >
              {t("reply")}
            </Typography>
            <Tooltip title={getDate(new Date(createdAt))} arrow>
              <Typography variant="body1" fontSize="12px">
                {date.fromNow()}
              </Typography>
            </Tooltip>
            {userId === idUser && (
              <Box onClick={setOpenMore}>
                <MoreHorizIcon />
              </Box>
            )}
            <Popover
              open={openMore}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              anchorEl={anchorEl}
              id={idMore}
              onClose={setCloseMore}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 100,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "center", vertical: "top" }}
            >
              <Box
                sx={{ padding: "5px 10px", width: "300px", cursor: "pointer" }}
              >
                <Typography onClick={() => setEditComment(true)}>
                  Chỉnh sửa
                </Typography>
                <Typography onClick={handleDelete}>Xóa</Typography>
              </Box>
            </Popover>
          </Box>
        </CommentContent>
      )}
    </Stack>
  );
}

export default CommentItem;
