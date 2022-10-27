import { Container } from '@mui/material';
import { useCallback } from 'react';

import Nav from './Nav';

const Layout = ({ children, maxWidth = false }) => {
  return (
    <Container
      disableGutters
      maxWidth={maxWidth}
      sx={{ marginTop: { xs: 1, sm: "70px" } }}
    >
      <Nav />
      {children}
    </Container>
  );
};

export default Layout;
