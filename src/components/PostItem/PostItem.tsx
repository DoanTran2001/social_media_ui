import { Link } from "react-router-dom";
import moment from "moment";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CommentIcon from "@mui/icons-material/Comment";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

import { PostHeader, PostWrapper, useStyles } from "./PostItem.style";
import "../../locales/vi/moment";
import { PostData } from "../../types/post.type";
import { getDate } from "../../utils/utils";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import commentsApi from "../../apis/comments.api";
import CommentItem from "../CommentItem";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  styled,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import CommentList from "../CommentList";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import postApi from "../../apis/post.api";
import GenerateAvatar from "../GenerateAvatar";

interface PostItemProps {
  data: PostData;
  shared?: boolean;
}

const ReplyComment = styled("div")(() => ({
  paddingLeft: "30px",
}));

const PostContentWrapper = styled("div")(() => ({
  "& img": {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
  },
}));

function PostItem({ data, shared }: PostItemProps) {
  // console.log("PostItem ~ data:", data);
  const user = useSelector((state: RootState) => state.user!);
  const [comment, setComment] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const date = moment(data.createdAt);
  moment.locale("vi");
  const queryClient = useQueryClient();
  const { data: comments } = useQuery({
    queryKey: ["commentsPost", data._id],
    queryFn: () => commentsApi.getComment(data._id),
  });
  const commentPostMutation = useMutation({
    mutationFn: (data: { idPost: string; body: any }) =>
      commentsApi.comment(data.idPost, data.body),
  });
  const likePostMutation = useMutation({
    mutationFn: (idPost: string) => {
      return postApi.likePost(idPost);
    },
  });
  const sharePostMutation = useMutation({
    mutationFn: (data: string) => postApi.sharePost(data),
  });
  const unLikePostMudation = useMutation({
    mutationFn: (idPost: string) => postApi.unLikePost(idPost),
  });
  const commentsPost = comments?.data.data.comments;

  const handleExpanded = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  const handleSharePost = async (id: string) => {
    sharePostMutation.mutate(id, {
      onSuccess: (data) => {
        console.log(data);
        toast.success(data.data.message);
      },
      onError: (err: any) => {
        console.log(err);
      },
    });
  };
  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(comment);
    const value = { idPost: data._id, body: { content: comment } };
    commentPostMutation.mutate(value, {
      onSuccess: (dataPost) => {
        console.log(dataPost);
        toast.success(dataPost.data.message);
        queryClient.invalidateQueries({ queryKey: ["commentsPost", data._id] });
        setComment("");
      },
    });
  };
  return (
    <PostWrapper>
      <Stack
        direction={"row"}
        justifyContent="space-between"
        alignItems="center"
        position={"relative"}
      >
        <PostHeader>
          <GenerateAvatar name={data.author.name} avatar={data.author.avatar} />
          <Box>
            {shared ? (
              <Box display="flex" alignItems="center" gap="5px">
                <Link to="/">
                  <Typography variant="h3">{user.name}</Typography>
                </Link>{" "}
                <Typography variant="body2" fontStyle="italic">
                  đã chia sẻ bài viết của
                </Typography>
                <Link to={`/profile/${data.author._id}`}>
                  <Typography variant="h3">{data.author.name}</Typography>
                </Link>
              </Box>
            ) : (
              <>
                <Link to={`/profile/${data.author._id}`}>
                  <Typography variant="h3">{data.author.name}</Typography>
                </Link>
                <Tooltip title={getDate(new Date(data.createdAt))} arrow>
                  <Typography>{date.fromNow()}</Typography>
                </Tooltip>
              </>
            )}
          </Box>
        </PostHeader>
        <Box>
          <MoreHorizIcon />
          <CloseIcon />
        </Box>
      </Stack>
      <Box>
        {/* <Typography>{data.content}</Typography> */}
        <PostContentWrapper
          dangerouslySetInnerHTML={{
            __html: data.content,
          }}
        ></PostContentWrapper>
      </Box>

      <Accordion
        sx={{ width: "100%", cursor: "default" }}
        expanded={isExpanded}
      >
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Typography
            textAlign={"end"}
            sx={{
              display: "flex",
              gap: "3px",
              alignItems: "center",
              fontWeight: 600,
              position: "relative",
              marginRight: "15px",
            }}
            onClick={handleExpanded}
          >
            {data.comments.length} <CommentIcon />
          </Typography>
          <Typography display="flex" alignItems={"center"} gap="5px" mr="15px">
            {data.likes.some((item) => item._id === user._id) ? (
              <ThumbUpAltIcon
                onClick={() => unLikePostMudation.mutate(data._id)}
              />
            ) : (
              <ThumbUpOffAltIcon
                onClick={() => likePostMutation.mutate(data._id)}
              />
            )}{" "}
            {data.likes.length}
          </Typography>
          <Typography>
            <Tooltip title="Chia sẻ" arrow>
              <ShareIcon onClick={() => handleSharePost(data._id)} />
            </Tooltip>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <CommentList commentsPost={commentsPost}/> */}
          <Box>
            {commentsPost?.map((comment) => {
              return <CommentList key={comment._id} comment={comment} />;
            })}
          </Box>

          {/* <Box>
            {commentsPost?.map((comment) => {
              console.log(comment);
              return (
                <Box>
                  <CommentItem
                    name={comment.author.name}
                    content={comment.content}
                    createdAt={comment.createdAt}
                    setOpenReply={setOpenReplyComment}
                  />
                  {comment.subComments.length > 0 &&
                    comment.subComments.map((subComment) => {
                      return (
                        <ReplyComment>
                          <CommentItem
                            name={subComment.author.name}
                            content={subComment.content}
                            createdAt={subComment.createdAt}
                            setOpenReply={setOpenReplyComment}
                          />
                        </ReplyComment>
                      );
                    })}
                  {openReplyComment && (
                    <TextField
                      size="small"
                      placeholder="Trả lời "
                      inputProps={{
                        style: {
                          fontSize: "12px",
                          background:
                            "linear-gradient(to right, #5433FF, #20BDFF, #A5FECB)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontWeight: "bold",
                        },
                      }}
                      className={classes.input}
                    />
                  )}
                </Box>
              );
            })}
          </Box> */}
          <form onSubmit={handleComment}>
            <TextField
              label="Bình luận"
              variant="outlined"
              sx={{ width: "100%" }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </form>
        </AccordionDetails>
      </Accordion>
    </PostWrapper>
  );
}

export default PostItem;
