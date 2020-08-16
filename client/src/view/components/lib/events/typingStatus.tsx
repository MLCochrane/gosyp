import { socket } from '../../../../api';
import { useEffect, useState } from 'react';

export default () => {
  const [typing, setTyping] = useState<Boolean>(false);
  useEffect(() => {
    socket.on('userTyping', (isTyping: Boolean) => {
      setTyping(isTyping);
    });
  }, []);

  return [typing];
};
