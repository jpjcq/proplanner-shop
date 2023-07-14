import { ReactNode, useMemo } from "react";
import {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
} from "styled-components";
import { lightTheme, Theme } from "./colors";

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

export const ThemedGlobalStyle = createGlobalStyle<{ theme: Theme }>`
  html {
    color: ${({ theme }) => theme.textPrimary};
    background: ${({ theme }) => theme.background}
  }
  &:focus{
    outline: none;
  }
`;
