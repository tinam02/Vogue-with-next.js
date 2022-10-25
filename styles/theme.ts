import { ThemeOptions } from "@mui/material/styles";

const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: ["BB Condensed", "BB", "Roboto", "Times New Roman"].join(","),
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "default" },
          style: {
            padding: "2px 12px",
            fontSize: "14px",
            margin: "0",
            // boxShadow: "none",
            fontFamily: "BB",
            borderRadius: "4px",
            "&:hover": {
              boxShadow: "none",
              outline: "1px solid",
            },
          },
        },
      ],
    },
  },
};

const darkPalette = {
  primary: {
    main: "#f5f5f5",
    mainGradient: "linear-gradient(transparent, black)",
  },
  secondary: {
    main: "#f5f5f5",
  },
  text: {
    primary: "#fff",
    secondary: "rgba(255, 255, 255, 0.7)",
  },
  background: {
    default: "#000",
    paper: "#000",
  },
};

const lightPalette = {
  primary: {
    main: "#000",
    mainGradient: "linear-gradient(transparent, white)",
  },
  secondary: {
    main: "#000",
  },
  text: {
    primary: "#000",
    secondary: "rgba(0, 0, 0, 0.50)",
  },
  background: {
    default: "#fff",
    paper: "#fff",
  },
};

export { baseTheme, darkPalette, lightPalette };
