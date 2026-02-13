import { useEffect, useState } from 'react';
import tasksApi from '../api/tasksApi';

const TaskPage = (props) => {
  const { params } = props;
  const taskId = params.id;

  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    tasksApi
      .getById(taskId)
      .then((task) => {
        setTask(task);
      })
      .catch(setHasError)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <div>Something went wrong or Task not found</div>;
  }

  return (
    <>
      <h1>{task.title}</h1>
      <p>{task.isDone ? 'Задача выполнена' : 'Задача не выполнена'}</p>
    </>
  );
};

export default TaskPage;
