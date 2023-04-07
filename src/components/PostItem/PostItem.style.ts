import { styled } from "@mui/material";
import { makeStyles } from "@mui/styles";

export const PostWrapper = styled("div")(() => ({
  border: "1px solid #eee",
  borderRadius: "10px",
  padding: "15px 10px",
  boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
  marginBottom: "10px",
}));

export const PostHeader = styled("div")(() => ({
  display: "flex",
  gridGap: "10px",
  marginBottom: "10px",
  "& a": {
    textDecoration: "none",
    color: "#333",
    "& h3": {
      fontWeight: 600,
    },
  },
}));

export const useStyles = makeStyles(() => ({
  input: {
    // background: "linear-gradient(#eee, #333)",
    // "-webkit-background-clip": "text",
    // "-webkit-text-fill-color": "transparent"
    width: '50%',
    "& ::placeholder": {
      color: "#FF0000",
    },
  },
}));
