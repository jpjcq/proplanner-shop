import { ReactNode, useMemo } from "react";
import {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
} from "styled-components";
import { lightColors } from "./colors";

const lightTheme = {
  ...lightColors,
  shadows: {
    inputShadow:
      "0px 3px 4px -2px rgba(24, 39, 75, 0.08), 0px 1px 4px -2px rgba(24, 39, 75, 0.12);",
    shallowShadow:
      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;",
    deepShadow:
      "box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;",
  },
};

// For future dark mode implementation
const darkMode = false;
const darkTheme = lightTheme;

function getTheme(darkMode: boolean) {
  return {
    darkMode,
    ...(darkMode ? darkTheme : lightTheme),
  };
}

export type ThemeType = ReturnType<typeof getTheme>;

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const themeObject = useMemo(() => getTheme(darkMode), []);
  return (
    <StyledComponentsThemeProvider theme={themeObject}>
      {children}
    </StyledComponentsThemeProvider>
  );
}

export const ThemedGlobalStyle = createGlobalStyle`
  html {
    color: ${({ theme }) => theme.textPrimary};
    background: ${({ theme }) => theme.background}
  }
  &:focus{
    outline: none;
  }
`;
