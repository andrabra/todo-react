import {useState, useRef, useCallback, useEffect, useMemo, useReducer} from 'react';
import tasksApi from '@/shared/api/tasks/index.js';

const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALL' : {
      return Array.isArray(action.tasks) ? action.tasks : state;
    }
    case 'ADD' :
      return [...state, action.task];
    case 'TOGGLE_COMPLETE' : {
      const { id, isDone } = action;

      return state.map((task) => {
        return task.id === id ? { ...task, isDone } : task;
      })
    }

    case 'DELETE' : {
      return state.filter((task) => task.id !== action.id)
    }
    case 'DELETE_ALL' : {
      return []
    }
    default:
      return state;
  }
};

const useTasks = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [disappearingTaskId, setDisappearingTaskId] = useState(null);
  const [appearingTaskId, setAppearingTaskId] = useState(null);

  const newTaskInputRef = useRef(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Are you sure?');
    if (isConfirmed) {
      tasksApi.deleteAll(tasks).then(() => {
        dispatch({ type: 'DELETE_ALL' });
      });
    }
  }, [tasks]);

  const deleteTask = useCallback(
    (taskId) => {
      tasksApi.delete(taskId).then(() => {
        setDisappearingTaskId(taskId);

        setTimeout(() => {
          dispatch({ type: 'DELETE', id: taskId })
          setDisappearingTaskId(null);
        }, 400);
      });
    },
    [],
  );

  const toggleTaskComplete = useCallback(
    (taskId, isDone) => {
      tasksApi.toggleComplete(taskId, isDone).then((updatedTask) => {
        dispatch({ type: 'TOGGLE_COMPLETE', id: taskId, isDone })
      });
    },
    [],
  );

  const addTask = useCallback((title, callbackAfterAdding) => {
    const newTask = {
      title,
      isDone: false,
      createdAt: new Date(),
    };

    tasksApi.add(newTask).then((newTask) => {
      dispatch({ type: 'ADD', task: newTask });

      if (typeof callbackAfterAdding === 'function') {
        callbackAfterAdding();
      }

      setSearchQuery('');

      newTaskInputRef.current.focus();

      setAppearingTaskId(newTask.id);
      setTimeout(() => setAppearingTaskId(null), 400);
    });
  }, []);

  useEffect(() => {
    newTaskInputRef.current.focus();

    tasksApi.getAll().then((data) => {
      dispatch({ type: 'SET_ALL', tasks: data })
    });
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
