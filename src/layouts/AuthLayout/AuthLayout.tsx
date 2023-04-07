import React, { ReactNode } from "react";
import { styled } from "@mui/material/styles";
import { Container, Stack, Box, Typography } from "@mui/material";
import background from "../../assets/images/bg.jpg";

interface AuthLayoutProps {
  children: ReactNode;
}

const Wrapper = styled("div")(({ theme }) => ({
  minHeight: "100vh",
  backgroundImage: `url(${background})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  position: "relative",
  display: "flex",
  alignContent: 'center',
  justifyContent: 'center',
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
  opacity: '.85',
  width: "60%",
  height: '100%',
  padding: "15px 10px",
  borderTopRightRadius: "10%",
  borderBottomRightRadius: "30%",
}));

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Wrapper>
      {/* <Container maxWidth={"md"}> */}
        <Stack
          sx={{
            border: "1px solid #eee",
            width: '800px',
            height: '500px',
            margin: 'auto',
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
            <Typography
              variant="h3"
              fontSize="30px"
              mb={3}
              sx={{
                textShadow: "0 0 0.2em #F87, 0 0 0.2em #F87",
                fontStyle: 'italic',
                // color: '#f1ebe5',
                fontFamily: "Lobster",
              }}
            >
              DSocial
            </Typography>

            {children}
          </Content>
        </Stack>
      {/* </Container> */}
    </Wrapper>
  );
}

export default AuthLayout;
