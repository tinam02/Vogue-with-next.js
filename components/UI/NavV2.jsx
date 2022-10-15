import { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { FBContext } from "../../context/FBContext";
import useScrollTrigger from "@mui/material/useScrollTrigger";

const NavV2 = () => {
  const { currentUser } = useContext(FBContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const trigger = useScrollTrigger();
  console.log("shit", trigger);
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        mt: 2,
        flexGrow: 1,
        boxShadow: 0,
        zIndex: 1000,
        borderBottom: "1px solid #000",
        borderTop: "1px solid #000",
        backgroundColor: "#fff",
        color: "#000",
        height: "40px",
        display: "grid",
        alignItems: "center",
        gridTemplateColumns: "1fr 1fr 1fr",
        px: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 4,
        }}
      >
        <Typography variant="h6" component="div">
          1
        </Typography>
        <Typography variant="h6" component="div">
          2
        </Typography>
        <Typography variant="h6" component="div">
          3
        </Typography>
      </Box>
      <Box
        sx={{
          overflow: "hidden",
          height: "100%",
          // width: "150px",
          // placeSelf: "center",
          // borderLeft: "1px solid #000",
          // borderRight: "1px solid #000",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            transform: `${
              trigger
                ? "translateY(100%); opacity:0"
                : "translateY(0); opacity:1"
            }`,
            transition:
              "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          RunwAy
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: `${
              trigger
                ? "translateY(-100%); opacity:1"
                : "translateY(0); opacity:0"
            }`,
          }}
        >
          hey
        </Box>
      </Box>
    </AppBar>
  );
};

export default NavV2;
