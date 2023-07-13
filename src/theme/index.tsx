import { ReactNode, useMemo } from "react";
import {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
} from "styled-components";
import { lightTheme, Theme } from "./colors";

// For future dark mode implementation
const darkMode = false;
const darkTheme = lightTheme;

export const BREAKPOINTS = {
  xs: 396,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
  xxxl: 1920,
};

export function getTheme(darkMode: boolean) {
  return {
    darkMode,
    ...(darkMode ? darkTheme : lightTheme),
  };
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const themeObject = useMemo(() => getTheme(darkMode), [darkMode]);
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
