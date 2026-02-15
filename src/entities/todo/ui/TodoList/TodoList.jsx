import {memo, useContext} from 'react';
import {TasksContext, TodoItem} from '@/entities/todo';

const TodoList = (props) => {
  const { styles } = props;
  const { tasks, filteredTasks } = useContext(TasksContext);

  const hasTasks = tasks.length > 0;
  const isEmptyFilteredTasks = filteredTasks?.length === 0;

  if (!hasTasks) {
    return (
      <div className={styles.todoEmptyMessage}>There are no tasks yet</div>
    );
  }

  if (hasTasks && isEmptyFilteredTasks) {
    return <div className={styles.todoEmptyMessage}>Tasks not found</div>;
  }

  return (
    <ul className={styles.todoList}>
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem
          className={styles.todoItem}
          id={task.id}
          key={task.id}
          title={task.title}
          isDone={task.isDone}
        />
      ))}
    </ul>
  );
};

export default memo(TodoList);
