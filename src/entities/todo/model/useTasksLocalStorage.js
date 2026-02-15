const useTasksLocalStorage = () => {
  const storedTasks = localStorage.getItem('tasks');
  const saveTasks = (tasks) =>
    localStorage.setItem('tasks', JSON.stringify(tasks));

  return {
    storedTasks: storedTasks ? JSON.parse(storedTasks) : null,
    saveTasks,
  };
};

export default useTasksLocalStorage;
