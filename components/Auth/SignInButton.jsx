import { useContext } from "react";
import { FBContext } from "../../context/FBContext";
import { Button } from "@mui/material";

const SignInButton = () => {
  const { signIn } = useContext(FBContext);

  return (
    <Button variant="new" onClick={signIn}>
      Sign In
    </Button>
  );
};

export default SignInButton;
