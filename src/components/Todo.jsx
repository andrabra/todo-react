import { AddTaskForm } from './AddTaskForm.jsx';
import { SearchTaskForm } from './SearchTaskForm.jsx';
import TodoInfo from './TodoInfo.jsx';
import TodoList from './TodoList.jsx';

const Todo = () => {
  const tasks = [
    { id: '1', title: 'Task 1', isDone: true },
    { id: '2', title: 'Task 2', isDone: false },
    { id: '3', title: 'Task 3', isDone: false },
  ];

  return (
    <div className='todo'>
      <h1 className='todo__title'>To Do List</h1>
      <AddTaskForm />
      <SearchTaskForm />
      <TodoInfo
        total={tasks.length}
        done={tasks.filter((task) => task.isDone).length}
      />
      <TodoList tasks={tasks} />
    </div>
  );
};

export default Todo;
