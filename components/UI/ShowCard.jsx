import { Box, Typography } from '@mui/material';
import Image from 'mui-image';
import React from 'react';

const ShowCard = ({
  slug,
  url,
  resizedUrl,
  altText,
  title,
  channel = "REVIEW",
  season,
  brand,
}) => {
  return (
    <Box
      sx={{
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          "> div": {
            transition: "transform 0.3s ease-in-out",
          },
          "> div:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Image src={resizedUrl} alt={altText} sx={{}} />
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="body2" color="text.primary">
            {channel.toUpperCase()} /&nbsp;
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {season}
          </Typography>
        </Box>
        {brand && (
          <Typography sx={{ fontWeight: "bold", fontSize: "large" }}>
            {brand}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ShowCard;
