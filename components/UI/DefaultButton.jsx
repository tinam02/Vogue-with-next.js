import { Button } from "@mui/material";
const DefaultButton = ({ onClick, text }) => {
  return (
    <Button variant="default" onClick={onClick}>
      {text}
    </Button>
  );
};

export default DefaultButton;
