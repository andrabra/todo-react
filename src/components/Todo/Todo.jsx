import styles from './Todo.module.scss';
import { useContext } from 'react';
import AddTaskForm from '../AddTaskForm/AddTaskForm.jsx';
import { SearchTaskForm } from '../SearchTaskForm/SearchTaskForm.jsx';
import TodoInfo from '../TodoInfo/TodoInfo.jsx';
import TodoList from '../TodoList/TodoList.jsx';
import Button from '../Button/Button.jsx';
import { TasksContext } from '../../context/TasksContext.jsx';

const Todo = () => {
  const { firstIncompleteTaskId, firstIncompleteTaskRef } =
    useContext(TasksContext);

  return (
    <div className={styles.todo}>
      <h1 className={styles.todoTitle}>To Do List</h1>
      <AddTaskForm styles={styles} />
      <SearchTaskForm styles={styles} />
      <TodoInfo styles={styles} />
      {firstIncompleteTaskId && (
        <Button
          onClick={() =>
            firstIncompleteTaskRef?.current?.scrollIntoView({
              behavior: 'smooth',
            })
          }
        >
          Show first incomplete task
        </Button>
      )}
      <TodoList styles={styles} />
    </div>
  );
};

export default Todo;
