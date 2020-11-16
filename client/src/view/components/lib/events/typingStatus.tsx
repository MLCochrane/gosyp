import { useEffect, useState } from 'react';
import { socket } from 'api';

export default () => {
  const [typing, setTyping] = useState<Boolean>(false);
  useEffect(() => {
    let mounted = true;
    socket.on('userTyping', (isTyping: Boolean) => {
      if (mounted) {
        setTyping(isTyping);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return [typing];
};
