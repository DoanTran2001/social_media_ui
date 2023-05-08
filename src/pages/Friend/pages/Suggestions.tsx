import { useMutation, useQuery } from "@tanstack/react-query";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import React from "react";
import { useSelector } from "react-redux";
import userApi from "../../../apis/user.api";
import { RootState } from "../../../store";
import { generateNameAvatar, randomGradient } from "../../../utils/utils";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const useStyles = makeStyles({
  button: {
    backgroundImage: "linear-gradient(to right, #B24592, #F15F79)",
    borderRadius: "30px",
    border: 0,
    color: "white !important",
    height: 48,
    padding: "0 30px !important",
    boxShadow: "none",
    marginBottom: "12px !important",
    "&:hover": {
      boxShadow: "none",
      backgroundColor: "#F15F79",
    },
  },
  avatar: {
    margin: "0 auto",
    // aspectRatio: 1,
    outline: "75px solid #00000040",
    outlineOffset: "-75px",
    cursor: "pointer",
    transition: "0.3s",
    "&:hover": {
      outline: "5px solid #4ECDC4",
      outlineOffset: "10px",
    },
  },
});

function Suggestions() {
  const classes = useStyles();
  const user = useSelector((state: RootState) => state.user.user);
  const { data, isLoading } = useQuery({
    queryKey: ["suggest", user?._id],
    queryFn: () => userApi.getSuggestFriend(),
    staleTime: 3 * 60 * 1000,
  });
  const requestAddFriendMutation = useMutation({
    mutationFn: (id: string) => userApi.requestAddFriend(id),
  });
  const suggestFriendData = data?.data.data;
  const handleRequestAddFriend = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    requestAddFriendMutation.mutate(id, {
      onSuccess: (data: any) => {
        console.log(data);
        toast.success(data.data.message);
      },
      onError: (error: any) => {
        console.log(error);
        toast.error(error.response.data.message);
      },
    });
  };
  return (
    <>
      {isLoading ? (
        <div className="">Loading ...</div>
      ) : (
        <Grid container>
          {suggestFriendData.map((item: any) => (
            <Grid
              item
              key={item._id}
              border="1px solid #eee"
              xs={4}
              padding={"5px 10px"}
              borderRadius="10px"
              boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
              textAlign={"center"}
            >
              <Link
                to={`/profile/${item._id}`}
                style={{ textDecoration: "none" }}
              >
                <Box>
                  {item.avatar ? (
                    <Avatar
                      src={item.avatar}
                      sx={{ width: "150px", height: "150px" }}
                      className={classes.avatar}
                    />
                  ) : (
                    <Avatar
                      variant="rounded"
                      sx={{ width: "100%", height: "150px", fontSize: "50px" }}
                      className={classes.avatar}
                    >
                      {generateNameAvatar(item.name)}
                    </Avatar>
                  )}
                  <Typography
                    textAlign={"center"}
                    mt="20px"
                    sx={{
                      backgroundImage: randomGradient("to right"),
                      WebkitBackgroundClip: "text",
                      MozBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Button
                    className={classes.button}
                    onClick={(e) => handleRequestAddFriend(e, item._id)}
                  >
                    Thêm bạn bè
                  </Button>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default Suggestions;
