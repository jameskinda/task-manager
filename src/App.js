import React, { useState } from "react";
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

export default function App() {
  const [tasks, setTasks] = useState(taskData);
  const [searchedTasks, setSearchedTasks] = useState();
  const [displayedTasks, setDisplayedTasks] = useState(tasks);
  const [searchOn, setSearchOn] = useState(false);
  const [sortOn, setSortOn] = useState(false);
  const [newTaskModal, setNewTaskModal] = useState(false);
  const [viewTask, setViewTask] = useState({});
  const [taskSearch, setTaskSearch] = useState(initSearch);

  const postTask = (taskDetails) => {
    taskDetails.id = Math.random().toString(36).substr(2, 9);
    taskDetails.postedOn = new Date();
    setTasks([...tasks, taskDetails]);
    setDisplayedTasks([...tasks, taskDetails]);
    setSearchOn(false);
    setSortOn(false);
    setTaskSearch(initSearch);
  };

  const search = (taskSearch) => {
    var temp;
    if (
      taskSearch.type == "Include all" &&
      taskSearch.location == "Include all"
    ) {
      return;
    } else if (taskSearch.type == "Include all") {
      temp = tasks.filter((task) => task.location == taskSearch.location);
    } else if (taskSearch.location == "Include all") {
      temp = tasks.filter((task) => task.type == taskSearch.type);
    } else {
      temp = tasks.filter(
        (task) =>
          task.type == taskSearch.type && task.location == taskSearch.location
      );
    }
    setDisplayedTasks(temp);
    setSearchedTasks(temp);
    setSearchOn(true);
  };

  const sort = () => {
    let sortedTasks = displayedTasks.slice().sort((a, b) => a.dueOn - b.dueOn);
    setDisplayedTasks([...sortedTasks]);
    setSortOn(true);
  };

  const cancelSearch = () => {
    if (sortOn) {
      let sortedTasks = tasks.slice().sort((a, b) => a.dueOn - b.dueOn);
      setDisplayedTasks([...sortedTasks]);
      setSearchOn(false);
    } else {
      setDisplayedTasks(tasks);
      setSearchOn(false);
    }
    setTaskSearch(initSearch);
  };

  const cancelSort = () => {
    if (searchOn) {
      setDisplayedTasks(searchedTasks);
      setSortOn(false);
    } else {
      setDisplayedTasks(tasks);
      setSortOn(false);
    }
  };

  const complete = (id) => {
    var newTasks = tasks.filter(function (task) {
      return task.id != id;
    });
    var newDisplayedTasks = displayedTasks.filter(function (task) {
      return task.id != id;
    });

    setTasks([...newTasks]);
    setDisplayedTasks([...newDisplayedTasks]);
    if (searchOn) {
      var newSearchedTasks = searchedTasks.filter(function (task) {
        return task.id != id;
      });
      setSearchedTasks([...newSearchedTasks]);
    }
    setViewTask({});
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          height: "100%",
          "min-height": "100vh",
          backgroundColor: theme.palette.app.background,
        }}
      >
        <Header openNewTaskModal={() => setNewTaskModal(true)} />
        <NewTaskModal
          postTask={postTask}
          newTaskModal={newTaskModal}
          closeTaskModal={() => setNewTaskModal(false)}
        />
        <ViewTaskModal
          task={viewTask}
          closeModal={() => setViewTask({})}
          complete={complete}
        />
        <Box mb={3}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <SearchBar
                search={search}
                sort={sort}
                taskSearch={taskSearch}
                setTaskSearch={setTaskSearch}
              />
              <Box>
                <Box my={2} display="flex" justifyContent="flex-end">
                  {searchOn && (
                    <Box mr={1}>
                      <Button onClick={cancelSearch}>
                        <CloseIcon size={20} />
                        Custom Search
                      </Button>
                    </Box>
                  )}
                  {sortOn && (
                    <Box>
                      <Button onClick={cancelSort}>
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
