import { useTheme } from "styled-components";

export default function ErrorIcon() {
  const theme = useTheme();
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill={theme.validation.red.regular} />
      <path
        d="M8 8L16 16M16 8L8 16"
        stroke={theme.validation.red.text}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
