import { createContext } from 'react';
import useTasks from '../hooks/useTasks';
import useIncompleteTaskScroll from '../hooks/useIncompleteTaskScroll';

export const TasksContext = createContext({});

export const TasksProvider = (props) => {
  const { children } = props;

  const {
    tasks,
    filteredTasks,
    deleteTask,
    toggleTaskComplete,
    deleteAllTasks,
    newTaskTitle,
    setNewTaskTitle,
    newTaskInputRef,
    searchQuery,
    setSearchQuery,
    addTask,
  } = useTasks();

  const { firstIncompleteTaskRef, firstIncompleteTaskId } =
    useIncompleteTaskScroll(tasks);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        filteredTasks,
        firstIncompleteTaskId,
        firstIncompleteTaskRef,
        deleteTask,
        toggleTaskComplete,
        deleteAllTasks,
        newTaskTitle,
        setNewTaskTitle,
        newTaskInputRef,
        searchQuery,
        setSearchQuery,
        addTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
