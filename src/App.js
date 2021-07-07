import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Box,
  CircularProgress,
  Grid,
  ThemeProvider,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import theme from "./theme/theme";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TaskCard from "./components/TaskCard";
import NewTaskModal from "./components/NewTaskModal";
import ViewTaskModal from "./components/ViewTaskModal";
import taskData from "./data/DefaultData";
import CloseIcon from "@material-ui/icons/Close";

const initSearch = {
  location: "Include all",
  type: "Include all",
};

const initState = {
  dueOn: "",
  title: "",
  type: "Family",
  location: "In person",
  description: "",
};

export default function App() {
  const [tasks, setTasks] = useState(taskData);
  const [displayedTasks, setDisplayedTasks] = useState(tasks);
  const [searchOn, setSearchOn] = useState(false);
  const [newSearchCheck, setNewSearchCheck] = useState(initSearch);
  const [sortOn, setSortOn] = useState(false);
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [viewTask, setViewTask] = useState({});
  const [taskSearch, setTaskSearch] = useState(initSearch);
  const [taskDetails, setTaskDetails] = useState(initState);

  useEffect(() => {
    if (sortOn && searchOn) {
      setDisplayedTasks(search(sort(tasks)));
    } else if (sortOn && !searchOn) {
      setDisplayedTasks(sort(tasks));
    } else if (!sortOn && searchOn) {
      setDisplayedTasks(search(tasks));
    } else {
      setDisplayedTasks(tasks);
    }
  }, [sortOn, searchOn, newSearchCheck, tasks]);

  const sort = (argTasks) => {
    return argTasks.slice().sort((a, b) => a.dueOn - b.dueOn);
  };

  const search = (tasks) => {
    if (
      taskSearch.type == "Include all" &&
      taskSearch.location == "Include all"
    ) {
      return tasks;
    } else if (taskSearch.type == "Include all") {
      return tasks.filter((task) => task.location == taskSearch.location);
    } else if (taskSearch.location == "Include all") {
      return tasks.filter((task) => task.type == taskSearch.type);
    } else {
      return tasks.filter(
        (task) =>
          task.type == taskSearch.type && task.location == taskSearch.location
      );
    }
  };

  const searchCheck = () => {
    if (
      taskSearch.type == "Include all" &&
      taskSearch.location == "Include all"
    ) {
      setSearchOn(false);
    } else {
      setSearchOn(true);
    }
  };

  const postTask = (taskDetails) => {
    if (!taskDetails.id) {
      taskDetails.id = Math.random().toString(36).substr(2, 9);
      taskDetails.postedOn = new Date();
      setTasks([...tasks, taskDetails]);
    } else {
      const updatedArray = tasks.map((obj) => {
        if (obj.id == taskDetails.id) {
          obj = taskDetails;
        }
        return obj;
      });
      setTasks(updatedArray);
    }
  };

  const editTask = (task) => {
    setViewTask({});
    setNewTaskModal(true);
    task = {
      ...task,
      dueOn: format(new Date(task.dueOn), "yyyy-MM-dd'T'HH:mm"),
    };
    setTaskDetails(task);
  };

  const complete = (id) => {
    var newTasks = tasks.filter(function (task) {
      return task.id != id;
    });
    setTasks([...newTasks]);
    setViewTask({});
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          height: "100%",
          minHeight: "100vh",
          backgroundColor: theme.palette.app.background,
        }}
      >
        <Header openNewTaskModal={() => setNewTaskModal(true)} />
        <NewTaskModal
          taskDetails={taskDetails}
          setTaskDetails={setTaskDetails}
          initState={initState}
          postTask={postTask}
          newTaskModal={newTaskModal}
          closeTaskModal={() => setNewTaskModal(false)}
        />
        <ViewTaskModal
          task={viewTask}
          closeModal={() => setViewTask({})}
          editTask={editTask}
          complete={complete}
        />
        <Box mb={3}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <SearchBar
                setSortOn={setSortOn}
                setSearchOn={searchCheck}
                taskSearch={taskSearch}
                setNewSearchCheck={setNewSearchCheck}
                setTaskSearch={setTaskSearch}
              />
              <Box>
                <Box my={2} display="flex" justifyContent="flex-end">
                  {searchOn && (
                    <Box mr={1}>
                      <Button onClick={() => setSearchOn(false)}>
                        <CloseIcon size={20} />
                        Custom Search
                      </Button>
                    </Box>
                  )}
                  {sortOn && (
                    <Box>
                      <Button onClick={() => setSortOn(false)}>
                        <CloseIcon size={20} />
                        Sort
                      </Button>
                    </Box>
                  )}
                </Box>
                {displayedTasks.map((task) => (
                  <TaskCard
                    open={() => setViewTask(task)}
                    key={task.id}
                    {...task}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box display="flex" justifyContent="center">
          <Typography>. . .</Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
