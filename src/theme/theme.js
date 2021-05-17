import { createMuiTheme } from "@material-ui/core";

const primary = "#2196f3";
const secondary = "#0B0B15";
const background = "#F1F3F4";
const card = "#fff";
const bleed = "#4D64E4";
const border = "#e8e8e8";
const passedDue = "#e91e63";
const oneDay = "#4caf50";
const thisWeek = "#ffc107";
const overWeek = "#ff9800";

export default createMuiTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    app: {
      background: background,
      card: card,
      bleed: bleed,
      border: border,
    },
    chip: {
      passedDue: passedDue,
      oneDay: oneDay,
      thisWeek: thisWeek,
      overWeek: overWeek,
    },
  },
  overrides: {
    MuiDialogActions: {
      root: {
        padding: "0.5rem 1.5rem 1rem 1.5rem",
      },
    },
    MuiButton: {
      root: {
        fontWeight: 600,
        textTransform: "none",
        padding: "0.375rem 1.5rem",
      },
      outlined: {
        borderRadius: "2.188rem",
        borderColor: secondary,
        padding: "0.375rem 1.25rem",
      },
    },
    MuiSelect: {
      filled: {
        padding: "0.938rem 0rem 0.938rem 0.938rem",
      },
    },
    MuiFilledInput: {
      input: {
        height: "3.063rem",
        padding: "0rem 0rem 0rem 0.625rem",
      },
    },
  },
});
