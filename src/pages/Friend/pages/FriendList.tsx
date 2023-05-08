import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import userApi from "../../../apis/user.api";
import GenerateAvatar from "../../../components/GenerateAvatar";
import { RootState } from "../../../store";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { path } from "../../../constants/path";
import { Avatar } from "@mui/material";
import { generateNameAvatar, randomGradient } from "../../../utils/utils";
import { useStyles } from "./Suggestions";

function FriendList() {
  const classes = useStyles();
  const user = useSelector((state: RootState) => state.user.user);
  const { data } = useQuery({
    queryKey: ["friends", user?._id],
    queryFn: () => userApi.getFriendList(user?._id!),
    staleTime: 3 * 60 * 1000,
  });
  const friendList = data?.data.data;
  console.log("FriendList ~ friendList:", friendList);
  return (
    <>
      <Grid container>
        {friendList &&
          friendList.length &&
          friendList.map((item: any) => (
            <Grid
              key={item._id}
              item
              border="1px solid #eee"
              xs={6}
              padding={"5px 10px"}
              borderRadius="10px"
              boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
            >
              <Link
                to={path.profileUser.replace(/:id/, item._id)}
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
                  {/* <Button
                    className={classes.button}
                    onClick={(e) => handleRequestAddFriend(e, item._id)}
                  >
                    Thêm bạn bè
                  </Button> */}
                </Box>

                {/* <Stack direction="row" gap="20px">
                  <GenerateAvatar name={item.name} avatar={item.avatar} />
                  <Box>
                    <Typography fontWeight="bold">{item.name}</Typography>
                  </Box>
                </Stack> */}
              </Link>
            </Grid>
          ))}
      </Grid>
    </>
  );
}

export default FriendList;
