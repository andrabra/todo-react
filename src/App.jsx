import Router from './router';
import TasksPage from './pages/TasksPage';
import TaskPage from './pages/TaskPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  const routes = {
    '/': TasksPage,
    '/tasks/:id': TaskPage,
    '*': () => <NotFoundPage />,
  };

  return <Router routes={routes} />;
};

export default App;
