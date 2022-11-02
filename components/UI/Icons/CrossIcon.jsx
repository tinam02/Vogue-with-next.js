import { SvgIcon } from "@mui/material";

function CrossIcon({ fontSize = "24px" }) {
  return (
    <SvgIcon
      sx={{
        p: 0,
        m: 0,
        display: "flex",
        alignItems: "center",
        color: "text.primary",
        fontSize,
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
      </svg>
    </SvgIcon>
  );
}

export default CrossIcon;
