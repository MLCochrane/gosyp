import { useEffect, useState } from 'react';
import { socket } from 'api';

export default () => {
  const [typing, setTyping] = useState<Boolean>(false);
  useEffect(() => {
    socket.on('userTyping', (isTyping: Boolean) => {
      setTyping(isTyping);
    });
  }, []);

  return [typing];
};
