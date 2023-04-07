import Box from "@mui/material/Box/Box";
import Stack from "@mui/material/Stack/Stack";
import { makeStyles } from "@mui/styles";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Menu from "../../components/Menu";
import { Content, SideLeft } from "../Home/Home.style";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  friendPageContent: {
    border: "3px solid",
    padding: "10px",
    borderRadius: "15px",
    "border-image-slice": 1,
    "border-image-source":
      "linear-gradient(to right bottom, #2980B9, #6DD5FA, #6a5af9)",
  },
  navLink: {
    textDecoration: "none",
    color: "#333",
    padding: "5px 10px",
    border: "1px solid #eee",
    borderRadius: '10px',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
  },
  activeLink: {
    borderBottom: "2px solid #1877F2",
    textDecoration: "none",
    color: "#1877F2",
    padding: "5px 10px",
    borderRadius: '10px',
    fontStyle: "italic",
    fontWeight: 'bold'
  },
});

function Friend() {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Stack direction={"row"} gap={5}>
      <SideLeft>
        <Menu />
      </SideLeft>
      <Content style={{ width: "100%", marginTop: "10px" }}>
        <Box>
          <Box mb="10px" display="flex" gap="15px">
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.activeLink : classes.navLink
              }
              to="/friends/request"
            >
              {t("friend request")}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.activeLink : classes.navLink
              }
              to="/friends/suggestions"
            >
              {t("suggest")}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.activeLink : classes.navLink
              }
              to="/friends/list"
            >
              {t("all friends")}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.activeLink : classes.navLink
              }
              to="/friends/birthdays"
            >
              {t("birthday")}
            </NavLink>
          </Box>

          <Box className={classes.friendPageContent}>
            <Outlet />
          </Box>
        </Box>
      </Content>
    </Stack>
  );
}

export default Friend;
