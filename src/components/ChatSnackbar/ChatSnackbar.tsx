import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import moment from "moment";
import Box from "@mui/material/Box";
import { Avatar, Button, Divider, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation, useQuery } from "@tanstack/react-query";
import chatMessageApi from "../../apis/chatMessage.api";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import GenerateAvatar from "../GenerateAvatar";
import { getDate } from "../../utils/utils";
import io from "socket.io-client";

interface ChatSnackbarProps {
  open: boolean;
  setOpen: () => void;
  setClose: () => void;
  receiver: { _id: string; name: string; avatar?: string };
}

interface Message {
  sender: string;
  receiver: string;
  content: string;
}

function ChatSnackbar(props: ChatSnackbarProps) {
  const [message, setMessage] = useState("");
  const [a, setA] = useState<Message[]>([]);
  const { open, receiver, setClose } = props;
  const userId = useSelector((state: RootState) => state.user.user?._id!);
  const { data: chatData, isLoading } = useQuery({
    queryKey: ["chatMessage", receiver],
    queryFn: () => chatMessageApi.getChatMessage(userId, receiver._id),
  });
  const chatMessages = chatData?.data.data;
  // console.log("ChatSnackbar ~ chatMessages:", chatData);
  const chatMessageMutation = useMutation({
    mutationFn: (data: { receiverId: string; content: string }) =>
      chatMessageApi.createChatMessage(data),
  });
  const handleChatMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataValue = {
      receiverId: receiver._id,
      content: message,
    };
    chatMessageMutation.mutate(dataValue, {
      onSuccess: (data) => {
        console.log(data);
        setMessage("");
      },
    });
    // socket.emit("send-message", {
    //   sender: userId,
    //   receiver: receiver._id,
    //   content: message,
    // });
  };
  useEffect(() => {
    if (chatMessages) {
      console.log(chatMessages);
      const socket = io("http://localhost:5000");
      socket.on("connect", () => {
        console.log("Connected to server");
      });
      socket.on("new-message", (message): any => {
        setA((prevChatMessages) => [...prevChatMessages, message]);
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [chatMessages]);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Box
        bgcolor="#fff"
        color=""
        height="400px"
        width="300px"
        sx={{
          boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`,
          borderRadius: "20px",
          padding: "10px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Stack
          direction="row"
          gap="15px"
          alignItems="center"
          justifyContent="space-between"
          mb="5px"
          position="sticky"
          top="0"
          left="0"
          bgcolor="#fff"
          zIndex="99"
          borderBottom="2px solid #eee"
          pb="10px"
        >
          <Stack direction="row" gap="15px" alignItems="center">
            <GenerateAvatar name={receiver.name} avatar={receiver.avatar} />
            <Typography fontWeight="bold">{receiver.name}</Typography>
          </Stack>
          <Button onClick={setClose}>
            <CloseIcon />
          </Button>
        </Stack>
        <Box
          sx={{ overflowY: "auto" }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
        >
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <Box display="flex" flexDirection="column">
                {chatMessages.length > 0 ?
                  chatMessages.map((chat: any) => {
                    if (chat.sender._id !== userId) {
                      return (
                        <Box
                          display="flex"
                          alignItems="center"
                          gap="10px"
                          paddingY="5px"
                        >
                          <GenerateAvatar
                            positionTooltip="left"
                            name={chat.sender.name}
                            avatar={chat.sender?.avatar}
                            sx={{
                              width: "30px",
                              height: "30px",
                              fontSize: "14px",
                            }}
                          />

                          <Tooltip
                            title={getDate(new Date(chat.createdAt))}
                            arrow
                          >
                            <Typography
                              textAlign="left"
                              sx={{
                                border: "1px solid #eee",
                                fontSize: "15px",
                                padding: "5px 10px",
                                borderRadius: "5px 20px 5px",
                                backgroundColor: "#E4E6EB",
                              }}
                            >
                              {chat.content}
                            </Typography>
                          </Tooltip>
                        </Box>
                      );
                    }
                    return (
                      <Box
                        display="flex"
                        alignItems="center"
                        gap="10px"
                        paddingY="5px"
                        textAlign="right"
                        marginLeft="auto"
                      >
                        <Tooltip
                          title={getDate(new Date(chat.createdAt))}
                          arrow
                        >
                          <Typography
                            sx={{
                              border: "1px solid #eee",
                              color: "#fff",
                              fontSize: "15px",
                              padding: "5px 10px",
                              borderRadius: "20px 5px 20px",
                              backgroundColor: "#0084FF",
                            }}
                          >
                            {chat.content}
                          </Typography>
                        </Tooltip>
                      </Box>
                    );
                  }) : <>
                    <Box textAlign="center" display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="10px" margin="10px 0">
                      <GenerateAvatar name={receiver.name} avatar={receiver.avatar}/>
                      <Typography fontWeight="bold">{receiver.name}</Typography>
                    </Box>
                  </>}
              </Box>
            </>
          )}
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: "10px",
            // left: 0,
            width: "100%",
          }}
        >
          <form onSubmit={handleChatMessage} autoComplete="off">
            <TextField
              sx={{ bgcolor: '#fff'}}
              size="small"
              placeholder="Aa"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </form>
        </Box>
      </Box>
    </Snackbar>
  );
}

export default ChatSnackbar;
