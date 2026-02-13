import { useState, useRef, useCallback, useEffect, useMemo } from 'react';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const newTaskInputRef = useRef(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Are you sure?');
    if (isConfirmed) {
      setTasks([]);
    }
  }, []);

  const deleteTask = useCallback(
    (taskId) => {
      setTasks(tasks.filter((task) => task.id !== taskId));
    },
    [tasks],
  );

  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
      setTasks(
        tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, isDone };
          }
          return task;
        }),
      );
    },
    [tasks],
  );

  const addTask = useCallback((title) => {
    const newTask = {
      title,
      isDone: false,
    };

    fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setNewTaskTitle('');
        setSearchQuery('');

        newTaskInputRef.current.focus();
      });
  }, []);

  useEffect(() => {
    newTaskInputRef.current.focus();

    // const fetchTasks = async () => {
    //   const response = await fetch('http://localhost:3001/tasks');
    //   const data = await response.json();
    //   setTasks(data);
    // };

    // fetchTasks();

    fetch('http://localhost:3001/tasks')
      .then((response) => response.json())
      .then(setTasks);
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
  };
};

export default useTasks;
