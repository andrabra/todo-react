import {BASE_URL} from "@/shared/constants/index.js";

const RouterLink = (props) => {
  const { to, children, ...rest } = props;

  const handleClick = (e) => {
    e.preventDefault();
    const fullPath = `${BASE_URL}${to}`;
    window.history.pushState({}, '', fullPath);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <a href={`${BASE_URL}${to}`} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

export default RouterLink;
