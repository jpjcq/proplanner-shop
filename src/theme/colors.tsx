export const blackA = {
  blackA1: 'hsla(0, 0%, 0%, 0.012)',
  blackA2: 'hsla(0, 0%, 0%, 0.027)',
  blackA3: 'hsla(0, 0%, 0%, 0.047)',
  blackA4: 'hsla(0, 0%, 0%, 0.071)',
  blackA5: 'hsla(0, 0%, 0%, 0.090)',
  blackA6: 'hsla(0, 0%, 0%, 0.114)',
  blackA7: 'hsla(0, 0%, 0%, 0.141)',
  blackA8: 'hsla(0, 0%, 0%, 0.220)',
  blackA9: 'hsla(0, 0%, 0%, 0.439)',
  blackA10: 'hsla(0, 0%, 0%, 0.478)',
  blackA11: 'hsla(0, 0%, 0%, 0.565)',
  blackA12: 'hsla(0, 0%, 0%, 0.910)',
};

export const olive = {
  olive1: 'hsl(110, 5.0%, 8.6%)',
  olive2: 'hsl(105, 7.4%, 10.6%)',
  olive3: 'hsl(106, 6.4%, 13.1%)',
  olive4: 'hsl(106, 5.8%, 15.3%)',
  olive5: 'hsl(107, 5.3%, 17.4%)',
  olive6: 'hsl(107, 4.9%, 19.9%)',
  olive7: 'hsl(108, 4.4%, 23.6%)',
  olive8: 'hsl(110, 3.8%, 30.6%)',
  olive9: 'hsl(110, 6.0%, 42.5%)',
  olive10: 'hsl(111, 4.8%, 48.2%)',
  olive11: 'hsl(110, 5.0%, 61.8%)',
  olive12: 'hsl(110, 6.0%, 93.0%)',
};

export const gray = {
  gray1: 'hsl(0, 0%, 8.5%)',
  gray2: 'hsl(0, 0%, 11.0%)',
  gray3: 'hsl(0, 0%, 13.6%)',
  gray4: 'hsl(0, 0%, 15.8%)',
  gray5: 'hsl(0, 0%, 17.9%)',
  gray6: 'hsl(0, 0%, 20.5%)',
  gray7: 'hsl(0, 0%, 24.3%)',
  gray8: 'hsl(0, 0%, 31.2%)',
  gray9: 'hsl(0, 0%, 43.9%)',
  gray10: 'hsl(0, 0%, 49.4%)',
  gray11: 'hsl(0, 0%, 62.8%)',
  gray12: 'hsl(0, 0%, 93.0%)',
};

const commonTheme = {
  white: "white",
  black: "black",
  blackA,
  olive,
  gray,

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
  background: "white",

  textPrimary: olive.olive5,
  textSecondary: olive.olive3,
  lightBorder: "#D6DAE1",

  shallowShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;",
  deepShadow:
    "box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;",

};

export type Theme = typeof lightTheme;

export const darkTheme = {};
