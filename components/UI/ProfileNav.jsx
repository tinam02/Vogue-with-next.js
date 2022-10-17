import React from "react";
import { Box, Button, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

const ProfileNav = () => {
  const router = useRouter();
  const { pathname } = router;
  const isActive = (path) => {
    return pathname === path;
  };

  const links = [
    {
      label: "/account",
      path: "/account",
    },
    {
      label: "/favorite-articles",
      path: "/account/favorite-articles",
    },
  ];

  return (
    <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
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
    </Box>
  );
};

export default ProfileNav;
