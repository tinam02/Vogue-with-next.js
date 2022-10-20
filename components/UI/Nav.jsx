import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
import { FBContext } from "../../context/FBContext";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import DefaultButton from "./DefaultButton";
import Link from "next/link";
import Image from "next/image";

const NavLink = ({ text, href }) => {
  return (
    <Link passHref href={href}>
      <Typography
        component="div"
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
      </Typography>
    </Link>
  );
};

const Nav = () => {
  const { currentUser, signIn } = useContext(FBContext);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 330,
  });

  return (
    <AppBar
      position="fixed"
      sx={{
        mt: 2,
        flexGrow: 1,
        boxShadow: 0,
        zIndex: 1000,
        borderTop: "1px solid #000",
        borderBottom: {
          xs: 0,
          sm: "1px solid #000",
        },
        backgroundColor: "#fff",
        color: "#000",
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
          gap: 5,
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
              fontSize: "21px",
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
            }}
          >
            <Image src={"/icons/logo.svg"} alt="logo" width={60} height='100%' />
          </Box>
        </Box>
      </Link>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 5,
          fontFamily: "BB",
        }}
      >
        {/* <NavLink text={"placeh"} href="/" /> */}

        {!currentUser && <DefaultButton onClick={signIn} text={"sign in"} />}
        {currentUser && (
          <Link passHref href="/account">
            <Box
              sx={{ display: "grid", placeItems: "center", cursor: "pointer" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.8151 4.47C17.735 4.47 17.6551 4.45 17.585 4.41C15.6651 3.42 14.005 3 12.015 3C10.0351 3 8.15506 3.47 6.44498 4.41C6.20499 4.54 5.90506 4.45 5.76504 4.21C5.63504 3.97 5.72501 3.66 5.965 3.53C7.82498 2.52 9.86502 2 12.015 2C14.1451 2 16.005 2.47 18.0451 3.52C18.2951 3.65 18.385 3.95 18.255 4.19C18.1651 4.37 17.995 4.47 17.8151 4.47ZM3.50504 9.72C3.40506 9.72 3.30496 9.69 3.215 9.63C2.98502 9.47 2.93497 9.16 3.095 8.93C4.08499 7.53 5.345 6.43 6.845 5.66C9.98502 4.04 14.005 4.03 17.1551 5.65C18.6551 6.42 19.9151 7.51 20.9051 8.9C21.065 9.12 21.015 9.44 20.7851 9.6C20.555 9.76 20.245 9.71 20.085 9.48C19.185 8.22 18.0451 7.23 16.695 6.54C13.825 5.07 10.1551 5.07 7.29507 6.55C5.93497 7.25 4.79507 8.25 3.89505 9.51C3.81497 9.65 3.66507 9.72 3.50504 9.72ZM9.40506 21.64C9.49503 21.74 9.62503 21.79 9.75503 21.79C9.88504 21.79 10.015 21.74 10.125 21.64C10.315 21.44 10.315 21.13 10.125 20.93C9.35501 20.15 8.91495 19.66 8.27505 18.51C7.66495 17.43 7.345 16.1 7.345 14.66C7.345 12.24 9.43497 10.27 12.005 10.27C14.575 10.27 16.6649 12.24 16.6649 14.66C16.6649 14.94 16.885 15.16 17.1649 15.16C17.445 15.16 17.6649 14.94 17.6649 14.66C17.6649 11.69 15.125 9.27 12.005 9.27C8.88504 9.27 6.345 11.69 6.345 14.66C6.345 16.27 6.70499 17.77 7.39505 19C8.06497 20.21 8.53494 20.77 9.40506 21.64ZM16.925 19.94C15.735 19.94 14.685 19.64 13.825 19.05C12.335 18.04 11.445 16.4 11.445 14.66C11.445 14.38 11.6649 14.16 11.945 14.16C12.225 14.16 12.445 14.38 12.445 14.66C12.445 16.07 13.1649 17.4 14.3849 18.22C15.095 18.7 15.925 18.93 16.925 18.93C17.1649 18.93 17.565 18.9 17.965 18.83C18.235 18.78 18.495 18.96 18.545 19.24C18.595 19.51 18.4149 19.77 18.1349 19.82C17.565 19.93 17.065 19.94 16.925 19.94ZM14.7851 21.98C14.8251 21.99 14.875 22 14.9151 22C15.125 22 15.3351 21.85 15.385 21.62C15.4551 21.36 15.3051 21.08 15.0351 21.01C13.625 20.62 12.715 20.1 11.765 19.16C10.5551 17.96 9.89505 16.36 9.89505 14.65C9.89505 13.58 10.8251 12.71 11.975 12.71C13.125 12.71 14.0551 13.58 14.0551 14.65C14.0551 16.27 15.4351 17.59 17.135 17.59C18.8351 17.59 20.215 16.27 20.215 14.65C20.215 10.33 16.515 6.82 11.965 6.82C8.73502 6.82 5.78506 8.63 4.45511 11.42C4.00504 12.37 3.77505 13.46 3.77505 14.66C3.77505 16.01 4.01504 17.31 4.50504 18.62C4.595 18.87 4.88504 19.01 5.14505 18.91C5.40506 18.82 5.53506 18.53 5.43509 18.27C4.83511 16.67 4.76504 15.44 4.76504 14.66C4.76504 13.62 4.965 12.67 5.35501 11.86C6.52505 9.41 9.12503 7.83 11.965 7.83C15.965 7.83 19.215 10.89 19.215 14.66C19.215 15.73 18.2851 16.6 17.135 16.6C15.985 16.6 15.0551 15.73 15.0551 14.66C15.0551 13.04 13.6751 11.72 11.975 11.72C10.2751 11.72 8.89505 13.04 8.89505 14.66C8.89505 16.64 9.66507 18.49 11.0651 19.88C12.1551 20.95 13.1951 21.54 14.7851 21.98Z"
                  fill="black"
                  fillOpacity="0.9"
                />
              </svg>
            </Box>
          </Link>
        )}
      </Box>
    </AppBar>
  );
};

export default Nav;
