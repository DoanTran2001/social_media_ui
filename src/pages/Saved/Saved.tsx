import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import React from "react";
import { Content, SideLeft } from "../Home/Home.style";
import Menu from "../../components/Menu";
import { NavLink, createSearchParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import userApi from "../../apis/user.api";
import PostItem from "../../components/PostItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { makeStyles } from "@mui/styles";
import SaveItem from "../../components/SaveItem";

const useStyles = makeStyles({
  navLink: {
    textDecoration: "none",
    color: "#333",
    padding: "5px 10px",
    border: "1px solid #eee",
    borderRadius: "10px",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  },
  activeLink: {
    borderBottom: "2px solid #1877F2",
    textDecoration: "none",
    color: "#1877F2",
    padding: "5px 10px",
    borderRadius: "10px",
    fontStyle: "italic",
    fontWeight: "bold",
  },
});

function Saved() {
  const classes = useStyles();
  const [searchParams] = useSearchParams();
  const user = useSelector((state: RootState) => state.user.user!);
  const { data: savedPost, isLoading } = useQuery({
    queryKey: ["savedId", searchParams.get("key")],
    queryFn: (data: any) =>
      userApi.getSavedPost({
        savedId: searchParams.get("key") as string,
        page: "1",
        limit: "10",
      }),
  });
  const { data: savedIds } = useQuery({
    queryKey: ["savedIds", user._id],
    queryFn: () => userApi.getSavedIds(),
  });
  const savedPostData = savedPost?.data;

  return (
    <Stack direction={"row"} gap={5} mt="74px">
      <SideLeft>
        <Menu />
      </SideLeft>
      <Content style={{ width: "100%", marginTop: "10px" }}>
        <Box mb="10px" display="flex" gap="15px">
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.activeLink : classes.navLink
            }
            to={{
              pathname: "/saved",
              search: createSearchParams({
                key: "all",
              }).toString(),
            }}
          >
            Tất cả
          </NavLink>
          {savedIds &&
            Object.keys(savedIds.data.data).length > 0 &&
            Object.keys(savedIds.data.data).map((item: any, index: any) => {
              return (
                <NavLink
                  key={index}
                  className={({ isActive }) =>
                    isActive ? classes.activeLink : classes.navLink
                  }
                  to={{
                    pathname: "/saved",
                    search: createSearchParams({
                      key: item,
                    }).toString(),
                  }}
                >
                  {item}
                </NavLink>
              );
            })}
        </Box>
        <Box>
          {isLoading ? (
            <Box>Loading...</Box>
          ) : (
            <Box>
              {savedPostData.data.map((item: any) => (
                <SaveItem data={item} key={item._id} />
              ))}
            </Box>
          )}
        </Box>
      </Content>
    </Stack>
  );
}

export default Saved;
