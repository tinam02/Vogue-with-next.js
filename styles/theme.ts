import { ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: ["BB Condensed", "BB", "Roboto", "Times New Roman"].join(","),
  },
  palette: {
    mode: "light",
    primary: {
      main: "#202127",
    },
    text: {
      secondary: "rgba(0, 0, 0, 0.50)",
    },
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
            boxShadow: "none",
            fontFamily: "BB",
            borderRadius: "4px",
            "&:hover": {
              boxShadow: "none",
              outline: "1px solid black",
            },
          },
        },
      ],
    },
  },
};

export default themeOptions;
