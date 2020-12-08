import {
  useEffect,
  useRef,
  useState,
} from 'react';

export default () => {
  const timeout = useRef(0);
  const [isResizing, setIsResizing] = useState(false);
  useEffect(() => {
    const callback = () => {
      setIsResizing(true);
      window.clearTimeout(timeout.current);
      timeout.current = window.setTimeout(() => {
        setIsResizing(false);
      }, 100);
    };

    window.addEventListener('resize', callback);
    return function unbind() {
      window.removeEventListener('resize', callback);
    };
  }, []);

  return [isResizing];
}