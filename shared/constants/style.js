export const colors = {
  primary: "#130029",
  secondary: "#314B88",
  tertiary: "#536EAD",
  logos: "#FFD57D",
  background: "rgb(250, 250, 250)",
  text: "#130029",
};

export const header = {
  height: "62px",
};

export const chat = {
  width: "285px",
};

export const aside = {
  width: "285px",
};

export const mobile = {
  minWidth: 0,
  maxWidth: 991,
};

export const desktop = {
  minWidth: 992,
  maxWidth: Infinity,
};

export const boxShadow = {
  default: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  hover: "0 2px 4px rgba(0,0,0,0.18), 0 1px 8px rgba(0,0,0,0.24)",
};

export const textShadow = {
  default: "1px 1px 1px #314B88"
};

export const transition = {
  default: "all 0.3s cubic-bezier(.25,.8,.25,1)",
  medium: "all 0.7s cubic-bezier(.25,.8,.25,1)",
  slow: "all 1.0s cubic-bezier(.25,.8,.25,1)",
};

export const breakpoints = {
  mobile: {
    minWidth: mobile.minWidth,
    maxWidth: mobile.maxWidth,
  },
  desktop: {
    minWidth: desktop.minWidth,
    maxWidth: desktop.maxWidth,
  },
};


export default {
  aside,
  breakpoints,
  boxShadow,
  chat,
  colors,
  desktop,
  header,
  mobile,
  transition,
  textShadow,
};
