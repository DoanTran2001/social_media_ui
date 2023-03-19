import { styled } from "@mui/material";

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
  marginBottom: '10px',
  "& a": {
    textDecoration: "none",
    color: "#333",
    "& h3": {
      fontWeight: 600,
    },
  },
}));
