import {useEffect, useState} from 'react';
import tasksApi from '@/shared/api/tasks/index.js';
import NotFoundPage from '@/pages/NotFoundPage';

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
  }, [taskId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <NotFoundPage />;
  }

  const createdDate = task?.createdAt
    ? new Date(task.createdAt)
    : null;

  const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const rtl = new Intl.RelativeTimeFormat('ru-RU', {
    numeric: 'auto',
  });

  const diffMs = createdDate
    ? Date.now() - createdDate.getTime()
    : 0;
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));

  return (
    <>
      <h1>{task.title}</h1>
      <p>{task.isDone ? 'Задача выполнена' : 'Задача не выполнена'}</p>
      <hr />
      {task.createdAt && (<div>Создана {rtl.format(-diffHours, 'hour')}</div>)}
      {task.createdAt && (<div>{dateFormatter.format(createdDate)}</div>)}
    </>
  );
};

export default TaskPage;
