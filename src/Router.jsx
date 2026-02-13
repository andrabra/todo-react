import { useRoute } from './hooks/useRoute';

const matchPath = (path, route) => {
  const pathParts = path.split('/');
  const routePaths = route.split('/');

  if (pathParts.length !== routePaths.length) {
    return null;
  }

  const params = {};

  for (let i = 0; i < routePaths.length; i++) {
    if (routePaths[i].startsWith(':')) {
      const paramName = routePaths[i].slice(1);
      params[paramName] = pathParts[i];
    } else if (routePaths[i] !== pathParts[i]) {
      return null;
    }
  }

  return params;
};

const Router = (props) => {
  const { routes } = props;

  const path = useRoute();
  for (const route in routes) {
    const params = matchPath(path, route);
    if (params) {
      const Page = routes[route];
      return <Page params={params} />;
    }
  }

  const NotFoundPage = routes['*'];
  return <NotFoundPage />;
};

export default Router;
