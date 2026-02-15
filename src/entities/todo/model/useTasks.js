import {useState, useRef, useCallback, useEffect, useMemo} from 'react';
import tasksApi from '@/shared/api/tasks/index.js';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [disappearingTaskId, setDisappearingTaskId] = useState(null);
  const [appearingTaskId, setAppearingTaskId] = useState(null);

  const newTaskInputRef = useRef(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Are you sure?');
    if (isConfirmed) {
      tasksApi.deleteAll(tasks).then(() => {
        setTasks([]);
      });
    }
  }, [tasks]);

  const deleteTask = useCallback(
    (taskId) => {
      tasksApi.delete(taskId).then(() => {
        setDisappearingTaskId(taskId);

        setTimeout(() => {
          setTasks(tasks.filter((task) => task.id !== taskId));
          setDisappearingTaskId(null);
        }, 400);
      });
    },
    [tasks],
  );

  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
      tasksApi.toggleComplete(taskId, isDone).then((updatedTask) => {
        setTasks(
          tasks.map((task) => {
            if (task.id === taskId) {
              return updatedTask;
            }
            return task;
          }),
        );
      });
    },
    [tasks],
  );

  const addTask = useCallback((title) => {
    const newTask = {
      title,
      isDone: false,
    };

    tasksApi.add(newTask).then((newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskTitle('');
      setSearchQuery('');

      newTaskInputRef.current.focus();

      setAppearingTaskId(newTask.id);
      setTimeout(() => setAppearingTaskId(null), 400);
    });
  }, []);

  useEffect(() => {
    newTaskInputRef.current.focus();

    tasksApi.getAll().then(setTasks);
  }, []);

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase();

    return clearSearchQuery.length > 0
      ? tasks.filter(({ title }) =>
        title.toLowerCase().includes(clearSearchQuery),
      )
      : null;
  }, [searchQuery, tasks]);

  return {
    tasks,
    newTaskTitle,
    setNewTaskTitle,
    searchQuery,
    newTaskInputRef,
    deleteAllTasks,
    deleteTask,
    toggleTaskComplete,
    addTask,
    filteredTasks,
    setSearchQuery,
    disappearingTaskId,
    appearingTaskId,
  };
};

export default useTasks;
