import {memo, useContext, useMemo} from 'react';
import {TasksContext} from '@/entities/todo';

const TodoInfo = (props) => {
  const { styles } = props;
  const { tasks, deleteAllTasks } = useContext(TasksContext);
  const total = tasks.length;
  const hasTasks = total > 0;
  const done = useMemo(
    () => tasks.filter((task) => task.isDone),
    [tasks],
  ).length;

  return (
    <div className={styles.todoInfo}>
      <div className={styles.todoTotalTasks}>
        Done {done} from {total}
      </div>
      {hasTasks && (
        <button
          className={styles.todoDeleteAllButton}
          type='button'
          onClick={deleteAllTasks}
        >
          Delete all
        </button>
      )}
    </div>
  );
};

export default memo(TodoInfo);
