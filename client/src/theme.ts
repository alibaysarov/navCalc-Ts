import { createTheme, responsiveFontSizes } from "@mui/material";
import { green } from "@mui/material/colors";
interface PaletteColor {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}
const font: string = "'Rubik', sans-serif";
let theme = createTheme({
  palette: {
    common: {
      white: "#F4F4F4",
    },
    primary: {
      main: "#005BE2",
    },
    secondary: {
      main: "#FF2424",
    },
    success: green,

    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    h1: {
      fontSize: 64,
      fontWeight: 700,
    },
    h2: {
      fontSize: 55,
      fontWeight: 600,
    },
    h3: {
      fontSize: 45,
      fontWeight: 500,
    },
    h4: {
      fontSize: 35,
      fontWeight: 500,
    },
    h5: {
      fontSize: 30,
      fontWeight: 500,
    },
    h6: {
      fontSize: 28,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 14,
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 400,
    },
    body1: {
      fontSize: 14,
      fontWeight: 400,
    },
    body2: {
      fontSize: 13,
      fontWeight: 400,
    },
    allVariants: {
      color: "#282828",
    },
    fontFamily: font,
    button: {
      textTransform: "none",
    },
  },
});

theme = responsiveFontSizes(theme);
export default theme;
