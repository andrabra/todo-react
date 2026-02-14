import Todo from '../components/Todo/Todo.jsx';
import { TasksProvider } from '../context/TasksContext.jsx';

const TasksPage = () => {
  return (
    <TasksProvider>
      <Todo />
    </TasksProvider>
  );
};

export default TasksPage;
