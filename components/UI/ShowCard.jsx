import { Box, Link as MuiLink, Typography } from "@mui/material";
import Image from "mui-image";
import Link from "next/link";

const ShowCard = ({
  slug,
  url,
  resizedUrl,
  altText,
  title,
  channel = "REVIEW",
  season,
  brand,
  isFave,
}) => (
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
      <Image
        src={resizedUrl || "/placeholder.jpg"}
        alt={altText}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </Box>
    <Link
        passHref
        href={{
          pathname: "/collection/[slug]",
          query: {
            slug: slug,
          },
        }}
      >
        <MuiLink underline="hover">
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
    </Box></MuiLink>
    </Link>
  </Box>
);

export default ShowCard;
