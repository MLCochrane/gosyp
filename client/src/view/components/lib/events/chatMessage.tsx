import { socket } from '../../../../api';
import { useEffect, useState } from 'react';

export default () => {
  const [message, setMessage] = useState<ChatMessage>({
    messageType: 'message',
    id: '',
    msg: '',
    userId: '',
  });
  useEffect(() => {
    socket.on('chatMessage', (msg: ChatMessage) => {
      setMessage({ ...msg, messageType: 'message' });
    });
  }, []);

  return [message];
};
