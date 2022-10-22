import { SvgIcon } from "@mui/material";

const BookmarkBlank = ({ fontSize = "24px" }) => {
  return (
    <SvgIcon
      sx={{
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
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5 3H19V21L12 18L5 21V3ZM12 15.82L17 18V5H7V18L12 15.82Z"
          fillOpacity="0.9"
        />
      </svg>
    </SvgIcon>
  );
};
const BookmarkFilled = ({ fontSize = "24px" }) => {
  return (
    <SvgIcon
      sx={{
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
        <path d="M19 3H5V21L12 18L19 21V3Z" fillOpacity="0.9" />
      </svg>
    </SvgIcon>
  );
};

export { BookmarkBlank, BookmarkFilled };
