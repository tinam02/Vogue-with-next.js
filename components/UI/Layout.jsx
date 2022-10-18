import { useCallback } from "react";
import { Container } from "@mui/material";
import NavV2 from "./Nav";

const Layout = ({ children, maxWidth = false }) => {
  return (
    <Container
      disableGutters
      maxWidth={maxWidth}
      sx={{ marginTop: { xs: 1, sm: "70px" } }}
    >
      <NavV2 />
      {children}
    </Container>
  );
};

export default Layout;
