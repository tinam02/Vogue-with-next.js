import { Box, Avatar, Typography } from "@mui/material";

const AuthorCard = ({ name, avatar }) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
      }}
    >
      <Avatar
        alt="author"
        src={avatar}
        sx={{
          width: 50,
          height: 50,
          filter: "grayscale(40%)",
          transition: "filter 0.2s ease-in-out",
          "&:hover": {
            filter: "none",
          },
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontFamily: "BB",
            fontSize: "12px",
            color: "text.secondary" 
          }}
        >
          AUTHOR /
        </Typography>
        <Typography sx={{ fontFamily: "BB", fontSize: "14px" }}>
          {name}
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthorCard;
