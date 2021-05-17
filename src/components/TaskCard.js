import React from "react";
import { Box, Grid, Typography, Button, makeStyles } from "@material-ui/core";
import { differenceInMinutes, format } from "date-fns";
import theme from "../theme/theme";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    border: "0.063rem solid " + theme.palette.app.border,
    cursor: "pointer",
    transition: ".3s",
    backgroundColor: theme.palette.app.card,

    "&:hover": {
      boxShadow: "0rem 0.313rem 1.563rem rgba(0,0,0,0.1)",
      borderLeft: "0.375rem solid " + theme.palette.app.bleed,
    },
  },
  chip: {
    fontSize: "0.844rem",
    padding: theme.spacing(0.75),
    borderRadius: "0.313rem",
    display: "inline-block",
    fontWeight: 600,
  },
}));

const getSettings = (dueOn) => {
  let temp =
    differenceInMinutes(dueOn, new Date()) <= 0
      ? { color: theme.palette.chip.passedDue, text: "Past due" }
      : differenceInMinutes(dueOn, new Date()) <= 1440
      ? { color: theme.palette.chip.oneDay, text: "Under 24 hrs" }
      : differenceInMinutes(dueOn, new Date()) <= 10080
      ? { color: theme.palette.chip.thisWeek, text: "This week" }
      : { color: theme.palette.chip.overWeek, text: "Over 1 week" };
  return temp;
};

export default (props) => {
  let chipSettings = getSettings(props.dueOn);

  const classes = useStyles();
  return (
    <Box className={classes.wrapper} p={2}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="subtitle1">{props.title}</Typography>
          <Typography
            variant="subtitle2"
            className={classes.chip}
            style={{ backgroundColor: chipSettings.color }}
          >
            {chipSettings.text}
          </Typography>
        </Grid>
        <Grid item container direction="column" alignItems="flex-end" xs>
          <Grid item>
            <Box display={{ xs: "none", sm: "block" }}>
              <Typography variant="caption">
                {props.type} | {props.location} |{" "}
                {format(props.dueOn, "M/d/yy")}
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box mt={2}>
              <Button onClick={props.open} variant="outlined">
                Details
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
