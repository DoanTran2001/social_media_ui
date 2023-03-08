import React, { ReactNode } from "react";
import { styled } from "@mui/material/styles";
import { Container, Stack, Box, Typography } from "@mui/material";
import background from "../../assets/images/background_auth.png";

interface AuthLayoutProps {
  children: ReactNode;
}

const Wrapper = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  backgroundImage: `url(${background})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  position: "relative",
  "&::after": {
    position: "absolute",
    content: '""',
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "#ffffff8f",
  },
}));
const Content = styled("div")(() => ({
  backgroundColor: "#fff",
  width: "60%",

  padding: "15px 10px",
  borderTopRightRadius: "10%",
  borderBottomRightRadius: "30%",
}));

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Wrapper>
      <Container maxWidth={"md"}>
        <Stack
          sx={{
            border: "1px solid #eee",

            borderRadius: 4,
            overflow: "hidden",
            position: "relative",
            zIndex: 2,
            background: "#fff",
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Content>
            <Typography variant="h3" mb={3}>
              Logo
            </Typography>

            {children}
          </Content>
        </Stack>
      </Container>
    </Wrapper>
  );
}

export default AuthLayout;
