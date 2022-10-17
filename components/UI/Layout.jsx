import React from "react";
import { Container } from "@mui/material";
import Nav from "./Nav";
import NavV2 from "./NavV2";

const Layout = ({ children }) => {
  //max width only on index pag
  const isMaxWidth = () => {
    if (typeof window !== "undefined") {
      if (window.location.pathname !== "/") {
        return 'lg';
      }
    }
    return false;
  };

  return (
    <Container
      disableGutters
      maxWidth={isMaxWidth()}
      sx={{ marginTop: { xs: 1, sm: "70px" } }}
    >
      <NavV2 />
      {children}
    </Container>
  );
};

export default Layout;
