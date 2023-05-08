import React, { useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { CommentData } from "../../types/comments.type";
import CommentItem from "../CommentItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import commentsApi from "../../apis/comments.api";

interface CommentListProp {
  comment: CommentData;
}

const ReplyComment = styled("div")(() => ({
  paddingLeft: "30px",
}));

function CommentList({ comment }: CommentListProp) {
  const [openReplyComment, setOpenReplyComment] = useState(false);
  const [value, setValue] = useState("");
  const queryClient = useQueryClient();
  const replyCommentMudation = useMutation({
    mutationFn: (data: { idPost: string; idComment: string; body: any }) =>
      commentsApi.replyComment(data.idPost, data.idComment, data.body),
  });
  const handleReplyComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataValue = {
      idPost: comment.post,
      idComment: comment._id,
      body: { content: value },
    };

    replyCommentMudation.mutate(dataValue, {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries({
          queryKey: ["commentsPost", dataValue.idPost],
        });
        setValue("");
        setOpenReplyComment(false);
      },
    });
  };
  return (
    <Box>
      <CommentItem
        name={comment.author.name}
        avatar={comment.author.avatar as string}
        content={comment.content}
        createdAt={comment.createdAt}
        setOpenReply={setOpenReplyComment}
        idUser={comment.author._id}
        postId={comment.post}
        commentId={comment._id}
      />
      {comment.subComments.length > 0 &&
        comment.subComments.map((subComment) => {
          return (
            <ReplyComment key={subComment._id}>
              <CommentItem
                name={subComment.author.name}
                avatar={subComment.author.avatar as string}
                content={subComment.content}
                createdAt={subComment.createdAt}
                setOpenReply={setOpenReplyComment}
                idUser={subComment.author._id}
                postId={comment.post}
                commentId={comment._id}
                reply
                replyId={subComment._id}
              />
            </ReplyComment>
          );
        })}
      {openReplyComment && (
        <form onSubmit={handleReplyComment} autoComplete="off">
          <TextField
            // sx={{mb: '10px'}}
            size="small"
            placeholder="Trả lời "
            fullWidth
            // sx={{
            //   mb: '10px',
            //   '& input': {
            //     fontSize: "12px",
            //     background: "linear-gradient(to right, #5433FF, #20BDFF, #A5FECB)",
            //     WebkitBackgroundClip: "text",
            //     WebkitTextFillColor: "transparent",
            //     fontWeight: "bold",
            //   }
            // }}
            // defaultValue={comment.author.name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            InputProps={{
              // style: {
              //   fontSize: "12px",
              //   background:
              //     "linear-gradient(to right, #5433FF, #20BDFF, #A5FECB)",
              //   WebkitBackgroundClip: "text",
              //   WebkitTextFillColor: "transparent",
              //   fontWeight: "bold",
              // },
              startAdornment: (
                <Typography
                  style={{
                    backgroundColor: "#2B568E",
                    color: "#D3E6EB",
                    padding: "3px 5px",
                    borderRadius: "5px",
                    marginRight: "5px",
                    // wordWrap: ''
                    fontSize: "12px",
                  }}
                >
                  {comment.author.name}
                </Typography>
              ),
            }}
          />
        </form>
      )}
    </Box>
  );
}

export default CommentList;
