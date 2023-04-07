import React, { useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { CommentData } from "../../types/comments.type";
import CommentItem from "../CommentItem";
import TextField from "@mui/material/TextField";
import { useMutation } from "@tanstack/react-query";
import commentsApi from "../../apis/comments.api";

interface CommentListProp {
  comment: CommentData;
}

const ReplyComment = styled("div")(() => ({
  paddingLeft: "30px",
}));

function CommentList({ comment }: CommentListProp) {
  // console.log("CommentList ~ comment:", comment)
  const [openReplyComment, setOpenReplyComment] = useState(false);
  const [value, setValue] = useState("");
  const replyCommentMudation = useMutation({
    mutationFn: (data: { idPost: string; idComment: string; body: any }) =>
      commentsApi.replyComment(data.idPost, data.idComment, data.body),
  });
  const handleReplyComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataValue = {
      idPost: comment.post,
      idComment: comment._id,
      body: {content: value}
    }
    replyCommentMudation.mutate(dataValue, {
      onSuccess: (data) => {
        console.log(data);
      }
    })
  };
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
            <ReplyComment key={subComment._id}>
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
        <form onSubmit={handleReplyComment} autoComplete="off">
          <TextField
            size="small"
            placeholder="Trả lời "
            fullWidth
            value={value}
            onChange={(e) => setValue(e.target.value)}
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
            // className={classes.input}
          />
        </form>
      )}
    </Box>
  );
}

export default CommentList;
