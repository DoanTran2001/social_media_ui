import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

function ServiceLayout() {
  return (
    <Container>
      <Box>
        <Link to="#">Dsocial</Link>
        <Link to="#">Chính sách và quy tắc của Dsocial</Link>
      </Box>
    </Container>
  );
}

export default ServiceLayout;
