import React from "react";
import { Container } from "@mui/material";
import Nav from "./Nav";
import NavV2 from "./NavV2";

const Layout = ({ children }) => {
  return (
    <div style={{ marginTop: '70px' }}>
      {/* <Container disableGutters maxWidth={false} sx={{ mt: 10 }}> */}
        <NavV2 />
        {children}
      {/* </Container> */}
    </div>
  );
};

export default Layout;
