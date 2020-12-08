import {
  useEffect,
  useRef,
  useState,
} from 'react';

export const ResizeHandler = () => {
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

export const MobileCheck = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    /**
     * Perhaps not the best solution. I think it'll get the
     * majority of devices in question, but maybe we just
     * want to detect touch events? Or add a touch event
     * check alonside this?
     *
     * Note this is not the browser width, but the actual
     * device screen width. This will not change over the
     */
    if (window.screen.width < 1000) {
      setIsMobile(true);
    };
  }, []);

  return [isMobile];
}