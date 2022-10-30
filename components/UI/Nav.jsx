import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link as MuiLink,
  SvgIcon,
} from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Link from "next/link";
import { useContext } from "react";

import { FBContext } from "../../context/FBContext";
import { ColorModeContext } from "../../context/themeContext";
import { AccountIcon, LoginIcon } from "./Icons/AccountActions";

const NavLink = ({ text, href }) => (
  <Link passHref href={href}>
    <MuiLink
      underline="none"
      sx={{
        fontFamily: "BB",
        fontSize: "14px",
        cursor: "pointer",
        transition: "opacity 0.2s ease-in-out",
        "&:hover": {
          opacity: 0.75,
        },
      }}
    >
      {text}
    </MuiLink>
  </Link>
);

const Nav = () => {
  const { currentUser, signIn } = useContext(FBContext);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 330,
  });
  const { toggleColorMode } = useContext(ColorModeContext);

  return (
    <AppBar
      position="fixed"
      sx={{
        mt: 2,
        flexGrow: 1,
        boxShadow: 0,
        zIndex: 1000,
        borderColor: "text.primary",
        borderTop: "1px solid",
        borderBottom: {
          xs: 0,
          sm: "1px solid",
        },
        backgroundColor: "background.default",
        color: "text.primary",
        height: {
          xs: "50px",
          sm: "40px",
        },
        display: "grid",
        alignItems: "center",
        gridTemplateColumns: "1fr 1fr 1fr",
        px: 2,
        top: {
          xs: "auto",
          sm: "0",
        },
        bottom: {
          xs: "0",
          sm: "auto",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: {
            xs: 3,
            sm: 5,
          },
          fontFamily: "BB",
        }}
      >
        <NavLink text="Shows" href="/" />
        <NavLink text="Articles" href="/articles" />
      </Box>
      {/* Logo */}
      <Link passHref href="/">
        <Box
          sx={{
            overflow: "hidden",
            height: "100%",
            // borderLeft: "1px solid #000",
            // borderRight: "1px solid #000",
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              fontSize: {
                xs: "14px",
                sm: "21px",
              },
              fontFamily: "BB Condensed",
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
            raw.edge
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
              color: "text.secondary",
            }}
          >
            <SvgIcon
              sx={{
                color: "text.primary",
                fontSize: {
                  xs: 50,
                  sm: 60,
                },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1000 1000"
                xmlSpace="preserve"
              >
                <path d="m206 552.7 71 61.2 51.5-71 71 66.1 19.6-41.7 80.9 58.9 80.9-58.9 19.6 41.7 71-66.1 51.5 71 71-61.2 66.1 53.9L990 373.8 857.7 528.2l-68.6-95.6-53.9 76-49-57.6-68.6 77.2v-63.7L500 545.4l-117.6-80.9v63.7L313.8 451l-49 57.6-53.9-76-68.6 95.6L10 373.8l129.9 232.8z" />
              </svg>
            </SvgIcon>
          </Box>
        </Box>
      </Link>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: {
            xs: 3,
            sm: 5,
          },
        }}
      >
        <Link passHref href="/search">
          <SvgIcon
            component="a"
            sx={{
              display: "flex",
              color: "text.primary",
              transition: "opacity 0.2s ease-in-out",
              "&:hover": {
                opacity: 0.75,
              },
              fontSize: {
                xs: 20,
                sm: 24,
              },
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.965 14.255H15.755L20.745 19.255L19.255 20.745L14.255 15.755V14.965L13.985 14.685C12.845 15.665 11.365 16.255 9.755 16.255C6.16504 16.255 3.255 13.345 3.255 9.755C3.255 6.16501 6.16504 3.255 9.755 3.255C13.345 3.255 16.255 6.16501 16.255 9.755C16.255 11.365 15.665 12.845 14.6851 13.985L14.965 14.255ZM5.255 9.755C5.255 12.245 7.26501 14.255 9.755 14.255C12.245 14.255 14.255 12.245 14.255 9.755C14.255 7.26501 12.245 5.255 9.755 5.255C7.26501 5.255 5.255 7.26501 5.255 9.755Z"
              />
            </svg>
          </SvgIcon>
        </Link>
        <SvgIcon
          sx={{
            color: "text.primary",
            cursor: "pointer",
            transition: "opacity 0.2s ease-in-out",
            "&:hover": {
              opacity: 0.75,
            },
            fontSize: {
              xs: 20,
              sm: 24,
            },
          }}
          onClick={toggleColorMode}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.9999 4V8.69L23.3099 12L19.9999 15.31V20H15.3099L11.9999 23.31L8.68994 20H3.99994V15.31L0.689941 12L3.99994 8.69V4H8.68994L11.9999 0.690002L15.3099 4H19.9999ZM9.49994 17.45C10.2599 17.8 11.1099 18 11.9999 18C15.3099 18 17.9999 15.31 17.9999 12C17.9999 8.69 15.3099 6 11.9999 6C11.1099 6 10.2599 6.2 9.49994 6.55C11.5599 7.5 12.9999 9.58 12.9999 12C12.9999 14.42 11.5599 16.5 9.49994 17.45Z"
            />
          </svg>
        </SvgIcon>

        {/* login */}
        {!currentUser && (
          <Box>
            <IconButton
              disableRipple
              onClick={signIn}
              sx={{
                display: {
                  lg: "none",
                },
                m: 0,
                p: 0,
                transition: "opacity 0.2s ease-in-out",
                "&:hover": {
                  opacity: 0.75,
                },
              }}
            >
              <LoginIcon />
            </IconButton>
            <Button
              sx={{
                display: { whiteSpace: "nowrap", xs: "none", lg: "block" },
              }}
              variant="default"
              onClick={signIn}
            >
              Log in
            </Button>
          </Box>
        )}
        {currentUser && (
          <Link passHref href="/account/favorite-articles">
            <Box>
              <AccountIcon />
            </Box>
          </Link>
        )}
      </Box>
    </AppBar>
  );
};

export default Nav;
