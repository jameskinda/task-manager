import React, { useState } from "react";
import {
  Box,
  Grid,
  FilledInput,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const initState = {
  dueOn: "",
  title: "",
  type: "Family",
  location: "In person",
  description: "",
};

export default (props) => {
  const hanndleChange = (e) => {
    e.persist();
    setTaskDetails((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const [taskDetails, setTaskDetails] = useState(initState);

  const handleSubmit = () => {
    for (const field in taskDetails) {
      if (typeof taskDetails[field] == "string" && !taskDetails[field]) {
        return console.log("not valid");
      }
    }
    props.postTask({ ...taskDetails, dueOn: Date.parse(taskDetails.dueOn) });
    closeModal();
  };

  const closeModal = () => {
    setTaskDetails(initState);
    props.closeTaskModal();
  };

  return (
    <Dialog open={props.newTaskModal} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Create Task
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FilledInput
              onChange={hanndleChange}
              name="title"
              value={taskDetails.title}
              placeholder="Title"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              onChange={hanndleChange}
              name="type"
              value={taskDetails.type}
              variant="filled"
              disableUnderline
              fullWidth
            >
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

          <Grid item xs={6}>
            <Select
              onChange={hanndleChange}
              name="location"
              value={taskDetails.location}
              variant="filled"
              disableUnderline
              fullWidth
            >
              <MenuItem value="In person">In person</MenuItem>
              <MenuItem value="Virtual">Virtual</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={6}>
            <TextField
              onChange={hanndleChange}
              value={taskDetails.dueOn}
              name="dueOn"
              InputProps={{ disableUnderline: true }}
              id="datetime-local"
              type="datetime-local"
              variant="filled"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FilledInput
              onChange={hanndleChange}
              name="description"
              value={taskDetails.description}
              placeholder="Description"
              disableUnderline
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box
          color="red"
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="caption">All Fields Required</Typography>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disableElevation
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
