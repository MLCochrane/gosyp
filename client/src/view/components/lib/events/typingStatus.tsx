import { useEffect, useState } from 'react';
import { socket } from 'api';

export default (): [boolean] => {
  const [typing, setTyping] = useState<boolean>(false);
  useEffect(() => {
    let mounted = true;
    socket.on('userTyping', (response: ResponseInterface) => {
      if (mounted) {
        setTyping(response.data.isTyping as boolean);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return [typing];
};
