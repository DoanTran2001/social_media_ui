import { Link } from "react-router-dom";
import moment from "moment";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CommentIcon from "@mui/icons-material/Comment";
import CloseIcon from "@mui/icons-material/Close";

import { PostHeader, PostWrapper } from "./PostItem.style";
import "../../locales/vi/moment";
import { PostData } from "../../types/post.type";
import { getDate } from "../../utils/utils";
import { useQuery } from "@tanstack/react-query";
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

interface PostItemProps {
  data: PostData;
}

const ReplyComment = styled("div")(() => ({
  paddingLeft: "30px",
}));

const PostContentWrapper = styled("div")(() => ({
  "& img": {
    width: "100%",
    height: '200px',
    objectFit: 'cover',
    borderRadius: '10px'
  },
}));

function PostItem({ data }: PostItemProps) {
  const date = moment(data.createdAt);
  moment.locale("vi");
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: comments } = useQuery({
    queryKey: ["commentsPost", data._id],
    queryFn: () => commentsApi.getComment(data._id),
  });
  const commentsPost = comments?.data.data.comments;

  const handleExpanded = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
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
          <Avatar></Avatar>
          <Box>
            <Link to="/">
              <Typography variant="h3">{data.author.name}</Typography>
            </Link>
            <Tooltip title={getDate(new Date(data.createdAt))} arrow>
              <Typography>{date.fromNow()}</Typography>
            </Tooltip>
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
            }}
            onClick={handleExpanded}
          >
            {data.comments.length} <CommentIcon />
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            {commentsPost?.map((comment) => {
              return (
                <Box>
                  <CommentItem
                    name={comment.author.name}
                    content={comment.content}
                  />
                  {comment.subComments.length > 0 &&
                    comment.subComments.map((subComment) => {
                      return (
                        <ReplyComment>
                          <CommentItem
                            name="sddd"
                            content={subComment.content}
                          />
                        </ReplyComment>
                      );
                    })}
                </Box>
              );
            })}
          </Box>
        </AccordionDetails>
      </Accordion>
    </PostWrapper>
  );
}

export default PostItem;
