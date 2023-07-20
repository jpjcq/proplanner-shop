import { useTheme } from "styled-components";

export default function WarningIcon() {
  const theme = useTheme();
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill={theme.validation.orange.regular} />
      <path
        d="M12 9.59995V12.2666M12 16.2186H8.76803C6.91736 16.2186 6.14403 14.896 7.04003 13.28L8.70403 10.2826L10.272 7.46662C11.2214 5.75462 12.7787 5.75462 13.728 7.46662L15.296 10.288L16.96 13.2853C17.856 14.9013 17.0774 16.224 15.232 16.224H12V16.2186Z"
        stroke={theme.validation.orange.text}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9976 13.8666H12.0017"
        stroke={theme.validation.orange.text}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
