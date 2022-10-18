import { useContext, useEffect } from "react";
import { Box, Button, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import DefaultButton from "./DefaultButton";
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
      label: "/account",
      path: "/account",
    },
    {
      label: "/favorite-articles",
      path: "/account/favorite-articles",
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
        <DefaultButton onClick={logOut} text={"sign out"} />
      </Box>
    </Box>
  );
};

export default ProfileNav;
