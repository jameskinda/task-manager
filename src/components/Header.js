import React from "react";
import { Box, Typography, Button, AppBar, Toolbar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export default (props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ fontWeight: "600" }}>
          To Do
        </Typography>

        <Box flexGrow={1}> </Box>
        <Button
          onClick={props.openNewTaskModal}
          variant="contained"
          color="secondary"
          fontSize="0.875rem"
          endIcon={<AddIcon />}
          disableElevation
          style={{ borderRadius: "1.25rem" }}
        >
          CREATE
        </Button>
      </Toolbar>
    </AppBar>
  );
};
