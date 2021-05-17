import React from "react";
import {
  Box,
  Button,
  Select,
  MenuItem,
  makeStyles,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.palette.app.card,
    display: "flex",
    flexGrow: 1,
    boxShadow: "0rem 0.063rem 0.313rem rgba(0,0,0,0.1)",
    borderRadius: "0.313rem",
  },
}));

export default (props) => {
  const handleChange = (e) => {
    e.persist();
    props.setTaskSearch((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const classes = useStyles();
  return (
    <Box className={classes.wrapper} mt={2} mb={2}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={3}
        style={{ margin: "0.5rem" }}
      >
        <Grid item md={3} xs={6}>
          <Select
            fullWidth
            onChange={handleChange}
            value={props.taskSearch.location}
            name="location"
            variant="filled"
            disableUnderline
            style={{ height: "3.125rem" }}
          >
            <MenuItem value="Include all">Include All</MenuItem>
            <MenuItem value="In person">In person</MenuItem>
            <MenuItem value="Virtual">Virtual</MenuItem>
          </Select>
        </Grid>
        <Grid item md={3} xs={6}>
          <Select
            fullWidth
            onChange={handleChange}
            value={props.taskSearch.type}
            name="type"
            variant="filled"
            disableUnderline
            style={{ height: "3.125rem" }}
          >
            <MenuItem value="Include all">Include all</MenuItem>
            <MenuItem value="Family">Family</MenuItem>
            <MenuItem value="Friends">Friends</MenuItem>
            <MenuItem value="Significant other">Significant other</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="School">School</MenuItem>
            <MenuItem value="Appointment">Appointment</MenuItem>
            <MenuItem value="Fitness">Fitness</MenuItem>
            <MenuItem value="Misc.">Misc.</MenuItem>
          </Select>
        </Grid>
        <Grid item md={3} xs={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => props.search(props.taskSearch)}
            style={{ height: "3.125rem" }}
          >
            Search
          </Button>
        </Grid>
        <Grid item md={3} xs={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disableElevation
            onClick={() => props.sort()}
            style={{ height: "3.125rem" }}
          >
            Sort
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
