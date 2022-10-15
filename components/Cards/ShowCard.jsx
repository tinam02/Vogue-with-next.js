import { Box, Typography } from "@mui/material";
import Image from "mui-image";
import React from "react";

const ShowCard = ({
  url,
  resizedUrl,
  altText,
  title,
  channel = "REVIEW",
  season,
  brand,
}) => {
  return (
    <Box>
      <Image src={resizedUrl} alt={altText} />

      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="body2" color="text.primary">
            {channel.toUpperCase()} /&nbsp;
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {season}
          </Typography>
        </Box>
        <Typography sx={{ fontWeight: "bold", fontSize: "large" }}>
          {brand}
        </Typography>
      </Box>
    </Box>
  );
};

export default ShowCard;
