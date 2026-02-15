import styles from './TodoItem.module.scss';
import { memo, useContext } from 'react';
import { TasksContext } from '../../context/TasksContext';
import RouterLink from '../RouterLink/RouterLink';

const TodoItem = (props) => {
  const { className = '', id, title, isDone } = props;

  const {
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
    deleteTask,
    toggleTaskComplete,
    disappearingTaskId,
    appearingTaskId,
  } = useContext(TasksContext);

  return (
    <li
      className={`${styles.todoItem} ${className} ${disappearingTaskId === id ? styles.isDisappearing : ''} ${appearingTaskId === id ? styles.isAppearing : ''}`}
      ref={id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
    >
      <input
        onChange={(e) => toggleTaskComplete(id, e.target.checked)}
        className={styles.todoItemCheckbox}
        id={id}
        type='checkbox'
        checked={isDone}
      />
      <label className={`${styles.todoItemLabel} visually-hidden`} htmlFor={id}>
        {title}
      </label>
      <RouterLink to={`/tasks/${id}`} aria-label='Task detail page'>
        {title}
      </RouterLink>
      <button
        onClick={() => deleteTask(id)}
        className={styles.todoItemDeleteButton}
        aria-label='Delete'
        title='Delete'
      >
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M15 5L5 15M5 5L15 15'
            stroke='#757575'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </li>
  );
};

export default memo(TodoItem);
