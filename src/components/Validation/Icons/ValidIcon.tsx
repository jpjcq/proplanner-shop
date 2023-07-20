import { useTheme } from "styled-components";

export default function ValidIcon() {
  const theme = useTheme();
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill={theme.validation.green.regular} />
      <path
        d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
        stroke={theme.validation.green.text}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
