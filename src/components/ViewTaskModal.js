import React from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  makeStyles,
  Grid,
  Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  header: {
    "margin-left": "0.25rem",
    "font-weight": "bold",
    display: "flex",
    "justify-content": "space-between",
    "align-items": "center",
  },
  info: {
    display: "flex",
    "& > *": {
      margin: "0.25rem",
    },
  },
  title: {
    "font-weight": "bold",
  },
}));

export default (props) => {
  const classes = useStyles();
  return (
    <Dialog open={!!Object.keys(props.task).length} fullWidth>
      <DialogTitle>
        <Box className={classes.header}>
          {props.task.title} - {props.task.location}
          <IconButton onClick={props.closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box>
          <Box className={classes.info}>
            <Typography variant="body1" className={classes.title}>
              Due on:
            </Typography>
            <Typography variant="body1">
              {props.task.dueOn &&
                format(props.task.dueOn, "MMM-dd-yyyy @ hh:mm aaaaa'm'")}
            </Typography>
          </Box>
          <Box className={classes.info}>
            <Typography variant="body1" className={classes.title}>
              Task type:
            </Typography>
            <Typography variant="body1">{props.task.type}</Typography>
          </Box>
          <Box className={classes.info}>
            <Typography variant="body1" className={classes.title}>
              Task location:
            </Typography>
            <Typography variant="body1">{props.task.location}</Typography>
          </Box>
          <Box className={classes.info}>
            <Typography variant="body1" className={classes.title}>
              Description:
            </Typography>
            <Typography variant="body1">{props.task.description}</Typography>
          </Box>
        </Box>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => props.complete(props.task.id)}
          >
            Complete
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
