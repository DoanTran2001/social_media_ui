import { Link } from "react-router-dom";
import moment from "moment";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CommentIcon from "@mui/icons-material/Comment";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import EditIcon from "@mui/icons-material/Edit";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AddIcon from "@mui/icons-material/Add";

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
  Divider,
  Modal,
  Popover,
  styled,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import CommentList from "../CommentList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import postApi from "../../apis/post.api";
import GenerateAvatar from "../GenerateAvatar";
import usePopover from "../../hooks/usePopover";
import useModal from "../../hooks/useModal";
import { addToSave } from "../../redux/save.slice";
import userApi from "../../apis/user.api";
import CreatePost from "../CreatePost";
import slugify from "slugify";
import { useTranslation } from "react-i18next";
import { locales } from "../../i18n/i18n";

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
  const { i18n, t } = useTranslation();
  const currentLanguage = locales[i18n.language as keyof typeof locales];
  const user = useSelector((state: RootState) => state.user.user!);
  const [comment, setComment] = useState("");
  const [saveKey, setSaveKey] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [openNewSave, setOpenNewSave] = useState(false);
  const {
    id: idMore,
    open: openMore,
    handleClick: setOpenMore,
    handleClose: setCloseMore,
    anchorEl,
  } = usePopover({ idProps: data._id });
  const { isOpen, openModal, closeModal } = useModal();
  const {
    isOpen: openEditPost,
    openModal: openModalEditPost,
    closeModal: closeModalEditPost,
  } = useModal();
  const date = moment(data.createdAt);
  if (currentLanguage === "Tiếng Việt") {
    moment.locale("vi");
  } else {
    moment.locale("en");
  }
  const queryClient = useQueryClient();
  const { data: comments } = useQuery({
    queryKey: ["commentsPost", data._id],
    queryFn: () => commentsApi.getComment(data._id),
  });
  const { data: savedIds } = useQuery({
    queryKey: ["savedIds", data.author._id],
    queryFn: () => userApi.getSavedIds(),
  });
  const savedPostMutation = useMutation({
    mutationFn: (data: { savedId: string; postId: string }) => {
      return userApi.savedPost(data);
    },
  });
  const unSavedPostMutation = useMutation({
    mutationFn: (data: { savedId: string; postId: string }) => {
      return userApi.unSavedPost(data);
    },
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
  const createSaveKey = useMutation({
    mutationFn: (body: { key: string }) => userApi.createSaveKey(body),
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
  const handleAddSaved = (savedId: string, postId: string) => {
    const dataSavedPost = { savedId, postId };
    savedPostMutation.mutate(dataSavedPost, {
      onSuccess: (data) => {
        toast.success(data.data.message);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  const handleCreateSaveKey = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createSaveKey.mutate(
      { key: slugify(saveKey) },
      {
        onSuccess: (data) => {
          toast.success(data.data.message);
          console.log(data);
        },
        onError: (err: any) => {
          console.log(err);
        },
      }
    );
  };

  const handleSaveAndUnSavePost = () => {
    if (data.savedKey) {
      const dataSavedPost = { savedId: data.savedKey, postId: data._id };
      unSavedPostMutation.mutate(dataSavedPost, {
        onSuccess: (data) => {
          toast.success(data.data.message);
        },
        onError: (error) => {
          console.log(error);
        },
      });
    } else {
      openModal();
    }
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
        <Box display="flex">
          <Box
            onClick={setOpenMore}
            sx={{ cursor: "pointer" }}
            aria-controls={openMore ? idMore : undefined}
            aria-haspopup="true"
            aria-expanded={openMore ? "true" : undefined}
          >
            <MoreHorizIcon />
          </Box>
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
            <Box>
              <Box
                sx={{
                  padding: "5px 10px",
                  display: "flex",
                  gap: "3px",
                  cursor: "pointer",
                  "& :hover": {
                    bgcolor: "#eee",
                    transition: ".25s linear ",
                  },
                }}
              >
                <BookmarkBorderIcon />
                <Box
                  onClick={handleSaveAndUnSavePost}
                >
                  <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                    {data.savedKey ? t("unsave post") : t("save post")}
                  </Typography>
                  <Typography fontSize="13px" fontStyle="italic">
                    {data.savedKey
                      ? t("remove this item from saved item")
                      : t("add to saved item list")}
                  </Typography>
                </Box>
              </Box>
              {user._id === data.author._id && (
                <Box
                  onClick={openModalEditPost}
                  sx={{
                    padding: "5px 10px",
                    display: "flex",
                    gap: "3px",
                    cursor: "pointer",
                    "& :hover": {
                      bgcolor: "#eee",
                      transition: ".25s linear ",
                    },
                  }}
                >
                  <EditIcon />
                  <Typography fontWeight="bold">{t("edit")}</Typography>
                </Box>
              )}

              <Modal
                open={openEditPost}
                onClose={closeModalEditPost}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    p: 2,
                    border: "1px solid #eee",
                    borderRadius: "10px",
                    minWidth: "900px",
                    minHeight: "400px",
                  }}
                >
                  <CreatePost
                    closeOpenModal={closeModalEditPost}
                    edit
                    editPostInfo={{
                      postId: data._id,
                      valuePost: data.content,
                    }}
                  />
                </Box>
              </Modal>
              <Modal
                open={isOpen}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 600,
                    bgcolor: "background.paper",
                    p: 4,
                  }}
                >
                  <Typography
                    textAlign={"center"}
                    mb="10px"
                    fontSize="20px"
                    fontWeight="bold"
                  >
                    {t("save to")}
                  </Typography>
                  <Divider />
                  <Box>
                    {savedIds &&
                      Object.keys(savedIds.data.data).length > 0 &&
                      Object.keys(savedIds.data.data).map(
                        (item: any, index: any) => {
                          return (
                            <Typography
                              key={index}
                              paddingY="10px"
                              sx={{
                                cursor: "pointer",
                                "&:hover": {
                                  background: "#F0F2F5",
                                  transition: "all .25s",
                                },
                              }}
                              onClick={() => handleAddSaved(item, data._id)}
                            >
                              {item}
                            </Typography>
                          );
                        }
                      )}
                  </Box>
                  <Divider />

                  {openNewSave ? (
                    <Box marginY="10px">
                      <form onSubmit={handleCreateSaveKey} autoComplete="off">
                        <TextField
                          size="small"
                          fullWidth
                          label={t("name")}
                          placeholder={`${t("name your collection")}`}
                          value={saveKey}
                          onChange={(e) => setSaveKey(e.target.value)}
                        />
                        <Box>
                          <Button onClick={() => setOpenNewSave(false)}>
                            {t("cancel")}
                          </Button>
                        </Box>
                      </form>
                    </Box>
                  ) : (
                    <Box
                      onClick={() => setOpenNewSave(true)}
                      sx={{
                        paddingY: "10px",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        gap: "10px",
                        "&:hover": {
                          bgcolor: "#c1c8d3",
                        },
                        marginY: "5px",
                        borderRadius: "10px",
                        transition: "all .25s",
                      }}
                    >
                      <Box
                        sx={{
                          width: "50px",
                          height: "50px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "#E4E6EB",
                          borderRadius: "10px",
                        }}
                      >
                        <AddIcon />
                      </Box>
                      <Typography
                        fontWeight="bold"
                        fontStyle="italic"
                        fontSize="18px"
                      >
                        {t("new collection")}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Modal>
            </Box>
          </Popover>
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
                onClick={() =>
                  likePostMutation.mutate(data._id, {
                    onSuccess: (data) => {},
                  })
                }
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
          <form onSubmit={handleComment} autoComplete="off">
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
