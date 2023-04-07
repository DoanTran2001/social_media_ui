import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Tooltip from "@mui/material/Tooltip";
import usePopover from "../../hooks/usePopover";
import { Avatar, Divider, ListItemIcon, Popover } from "@mui/material";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import {
  generateNameAvatar,
  getCookie,
  getTokenFromCookie,
} from "../../utils/utils";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import GenerateAvatar from "../GenerateAvatar";
import { useTranslation } from "react-i18next";
import { locales } from "../../i18n/i18n";
import { useNavigate } from "react-router-dom";
import { path } from "../../constants/path";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { i18n } = useTranslation();
  const currentLanguage = locales[i18n.language as keyof typeof locales];
  const {
    open: openAccount,
    handleClick: handleClickAccount,
    handleClose: handleCloseAccount,
    anchorEl: anchorElAccount,
    id: idAccount,
  } = usePopover({ idProps: "headerMore" });
  const {
    open: openLanguage,
    handleClick: handleClickLanguage,
    handleClose: handleCloseLanguage,
    anchorEl: anchorElLanguage,
    id: idLanguage,
  } = usePopover({ idProps: "languageMore" });

  const user = useSelector((state: RootState) => state.user);

  const handleChangeLanguage = (lng: "en" | "vi") => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            DSocial
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: "none", md: "flex", alignItems: "center" } }}
          >
            <Tooltip title={t("language")} arrow>
              <Typography
                onClick={handleClickLanguage}
                aria-controls={openLanguage ? idLanguage : undefined}
                aria-haspopup="true"
                aria-expanded={openLanguage ? "true" : undefined}
                sx={{ cursor: "pointer" }}
              >
                {currentLanguage}
              </Typography>
            </Tooltip>
            <Popover
              open={openLanguage}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              anchorEl={anchorElLanguage}
              id={idLanguage}
              onClose={handleCloseLanguage}
            >
              <Box padding="10px 15px">
                <Box onClick={() => handleChangeLanguage("vi")} sx={{cursor: 'pointer'}}>Tiếng việt</Box>
                <Box onClick={() => handleChangeLanguage("en")} sx={{cursor: 'pointer'}}>English</Box>
              </Box>
            </Popover>
            <Tooltip title={t("account")} arrow>
              <IconButton
                onClick={handleClickAccount}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={openAccount ? idAccount : undefined}
                aria-haspopup="true"
                aria-expanded={openAccount ? "true" : undefined}
              >
                <GenerateAvatar
                  avatar={user?.avatar}
                  name={user?.name as string}
                />
              </IconButton>
            </Tooltip>
            <Popover
              open={openAccount}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              anchorEl={anchorElAccount}
              // anchorEl={anchorEl}
              id={idAccount}
              // open={open}
              onClose={handleCloseAccount}
              onClick={handleCloseAccount}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
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
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              // anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={() => navigate(path.profile)}>
                <Avatar /> Tài khoản của tôi
              </MenuItem>
              <MenuItem onClick={() => navigate('/friends/list')}>
                <Avatar /> Bạn bè
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleCloseAccount}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Cài đặt
              </MenuItem>
              <MenuItem onClick={handleCloseAccount}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Đăng xuất
              </MenuItem>
            </Popover>
          </Box>
          {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box> */}
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu} */}
      {/* {renderMenu} */}
    </Box>
  );
}
