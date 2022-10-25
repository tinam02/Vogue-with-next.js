import { Box, Typography } from "@mui/material";

const SearchNav = ({ selected, setSelected }) => {
  const isActive = (name) => {
    return selected === name;
  };

  const links = [
    {
      label: "/brands",
      selectedLabel: "brands",
    },
    {
      label: "/articles",
      selectedLabel: "articles",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        py: 2,
      }}
    >
      {links.map((link, i) => {
        return (
          <Typography
            onClick={() => setSelected(link.selectedLabel)}
            key={i}
            sx={{
              textDecoration: isActive(link.selectedLabel)
                ? "underline"
                : "none",
              fontFamily: "BB",
              "&:hover": {
                textDecoration: "underline",
              },
              cursor: "pointer",
            }}
          >
            {link.label}
          </Typography>
        );
      })}
    </Box>
  );
};

export default SearchNav;
