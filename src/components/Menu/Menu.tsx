import React from "react";
import { Box, MenuList, Typography } from "@mui/material";
import { menuSidebar } from "../../constants/constants";
import NavLinkMenuItem from "./NavLinkMenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const NavLinkCustom = styled(NavLink)({
  textDecoration: "none",
  "&.activeLink": {
    borderLeft: "2px solid #1877F2 !important",
  },
});

const useStyles = makeStyles({
  navLink: {
    textDecoration: "none",
    color: "#333",
  },
  activeLink: {
    borderLeft: "2px solid #1877F2",
    textDecoration: "none",
    color: "#1877F2",
    fontStyle: 'italic'
  },
});

function Menu() {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column" gap="10px" mt="10px">
      {menuSidebar.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          className={({ isActive }) =>
            isActive ? classes.activeLink : classes.navLink
          }
        >
          <Box
            display="flex"
            gap="15px"
            padding="5px 10px"
            border="1px solid #eee"
            borderRadius="10px"
          >
            {item.icon}
            <Typography fontWeight="bold">{t(item.locale)}</Typography>
          </Box>
        </NavLink>
      ))}
    </Box>
  );
}

export default Menu;
