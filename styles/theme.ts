import { ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#202127",
    },
    secondary: {
      main: "#FBAE17",
    },
    info: {
      main: "#0084FF",
    },
    success: {
      main: "#2CB742",
    },
    warning: {
      main: "#FB5B17",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "new" },
          style: {
            color: "white",
            fontWeight: 700,
            fontSize: "16px",
            display: "block",
            boxShadow: "none",
            borderRadius: "50px",
            margin: "27px auto 8px",
            padding: "12px 43px 10px",
            backgroundColor: "#FBAE17",
            "&:hover": {
              boxShadow: "none",
              backgroundColor: "#DC9814",
            },
          },
        },
      ],
    },
  },
};

export default themeOptions;
