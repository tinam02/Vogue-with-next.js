import { Box, Button, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

import { FBContext } from "../../context/FBContext";

const ProfileNav = () => {
  const router = useRouter();
  const { pathname, push } = router;
  const { logOut } = useContext(FBContext);

  const isActive = (path) => {
    return pathname === path;
  };

  const links = [
    {
      label: "/favorite-articles",
      path: "/account/favorite-articles",
    },

    {
      label: "/saved-shows",
      path: "/account/saved-shows",
    },
    {
      label: "/account",
      path: "/account",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        alignItems: "center",
        px: {
          xs: 2,
          md: 0,
        },
        pb: 2,
      }}
    >
      {links.map((link, i) => {
        return (
          <Link passHref href={link.path} key={i}>
            <MuiLink
              underline="hover"
              sx={{
                textDecoration: isActive(link.path) ? "underline" : "none",
                fontFamily: "BB",
              }}
            >
              {link.label}
            </MuiLink>
          </Link>
        );
      })}

      <Box sx={{ ml: "auto" }}>
        <Button onClick={logOut} variant="default">
          Sign out
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileNav;
