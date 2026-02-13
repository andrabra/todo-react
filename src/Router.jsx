import { useRoute } from './hooks/useRoute';

const Router = (props) => {
  const { routes } = props;

  const path = useRoute();

  if (path.startsWith('/tasks/')) {
    const id = path.replace('/tasks/', '');
    const TaskPage = routes[`/tasks/:id`];
    return <TaskPage params={{ id }} />;
  }
  const Page = routes[path] ?? routes['*'];

  return <Page />;
};

export default Router;
