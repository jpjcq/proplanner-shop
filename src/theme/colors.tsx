import { opacify } from "./utils";

export const colors = {
  white: "#FFFFFF",
  black: "#000000",
  gray50: "#F5F6FC",
  gray100: "#E8ECFB",
  gray150: "#D2D9EE",
  gray200: "#B8C0DC",
  gray250: "#A6AFCA",
  gray300: "#98A1C0",
  gray350: "#888FAB",
  gray400: "#7780A0",
  gray450: "#6B7594",
  gray500: "#5D6785",
  gray550: "#505A78",
  gray600: "#404A67",
  gray650: "#333D59",
  gray700: "#293249",
  gray750: "#1B2236",
  gray800: "#131A2A",
  gray850: "#0E1524",
  gray900: "#0D111C",
  gray950: "#080B11",
  darkGreen: "#182017",
  lightGrey: "#DAE1ED",
};

const commonTheme = {
  white: colors.white,
  black: colors.black,

  validation: {
    orange: {
      light: "#FF9B2533",
      regular: "#FF9B25",
      text:"#4B371F"
    }
  }
};

export const lightTheme = {
  ...commonTheme,
  background: colors.white,
  backgroundModal: opacify(72, colors.gray900),

  textPrimary: colors.darkGreen,
  textSecondary: colors.lightGrey,
  lightBorder: "#D6DAE1",

  shallowShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;",
  deepShadow:
    "box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;",

};

export type Theme = typeof lightTheme;

export const darkTheme = {};
