import {useEffect, useState} from 'react';
import {BASE_URL} from "@/shared/constants/index.js";

const getCurrentPath = () => {
  const pathName = window.location.pathname;

  return pathName.startsWith(BASE_URL)
    ? pathName.slice(BASE_URL.length - 1) || '/'
    : pathName;
}

export const useRoute = () => {
  const [path, setPath] = useState(getCurrentPath());

  useEffect(() => {
    const onLocationChange = () => {
      setPath(getCurrentPath());
    };

    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  return path;
};
