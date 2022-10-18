import { Container, Typography } from "@mui/material";
import Image from "mui-image";

const FourOhFour = () => {
  return (
    <Container>
      <Image src={"404.png"} alt="This page does not exist!" />
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "large",
          fontWeight: "bold",
          letterSpacing: "1px",
        }}
      >
        Oops! It looks like nothing was found at this location. Please check the
        URL and try again.
      </Typography>
    </Container>
  );
};

export default FourOhFour;
