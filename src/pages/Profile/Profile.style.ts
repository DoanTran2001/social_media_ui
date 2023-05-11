import { styled } from "@mui/material/styles";

export const ProfileHead = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  marginBottom: '10px'
}));

export const ProfileImageWrapper = styled("div")(() => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
}));

export const ModalContentContainer = styled("div")(() => ({
  overflowY: "auto",
  background: "#fff",
  minHeight: "500px",
  width: '900px',
  borderRadius: '15px',
  padding: '10px'
}));
