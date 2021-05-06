import { useEffect, useState } from 'react';
import { socket } from 'api';

export default (): [boolean] => {
  const [typing, setTyping] = useState<boolean>(false);
  useEffect(() => {
    let mounted = true;
    socket.on('userTyping', (isTyping: boolean) => {
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
