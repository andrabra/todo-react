import { useState, useRef, useCallback, useEffect, useMemo } from 'react';

const useTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
      return JSON.parse(storedTasks);
    }

    return [
      { id: '1', title: 'Task 1', isDone: true },
      { id: '2', title: 'Task 2', isDone: false },
      { id: '3', title: 'Task 3', isDone: false },
    ];
  });
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const newTaskInputRef = useRef(null);
  const firstIncompleteTaskRef = useRef(null);

  const firstIncompleteTaskId = tasks.find((task) => !task.isDone)?.id;

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

  const addTask = useCallback(() => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskTitle('');
      setSearchQuery('');
      newTaskInputRef.current.focus();
    }
  }, [newTaskTitle]);

  useEffect(() => {
    newTaskInputRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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
    searchQuery,
    newTaskInputRef,
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
    deleteAllTasks,
    deleteTask,
    toggleTaskComplete,
    addTask,
    filteredTasks,
    setSearchQuery,
  };
};

export default useTasks;
