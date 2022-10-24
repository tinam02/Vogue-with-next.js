import { SvgIcon } from "@mui/material";

const ShowSingleImage = () => (
  <SvgIcon
    sx={{
      display: "flex",
      alignItems: "center",
      color: "text.primary",
      fontSize: 36,
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
        d="M3.5 11.5V5.5H20.5V11.5H3.5ZM20.5 18.5H3.5V12.5H20.5V18.5Z"
      />
    </svg>
  </SvgIcon>
);

const ShowFourImages = () => (
  <SvgIcon
    sx={{
      display: "flex",
      alignItems: "center",
      color: "text.primary",
      fontSize: 36,
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
        d="M8.5 11.5H3.5V5.5H8.5V11.5ZM8.5 18.5H3.5V12.5H8.5V18.5ZM9.5 18.5H14.5V12.5H9.5V18.5ZM20.5 18.5H15.5V12.5H20.5V18.5ZM9.5 11.5H14.5V5.5H9.5V11.5ZM15.5 11.5V5.5H20.5V11.5H15.5Z"
      />
    </svg>
  </SvgIcon>
);

export { ShowSingleImage, ShowFourImages };
