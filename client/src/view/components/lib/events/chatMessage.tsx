import { useEffect, useState } from 'react';
import { socket } from '../../../../api';

export default () => {
  const [message, setMessage] = useState<ChatMessage>({
    messageType: 'message',
    id: '',
    msg: '',
    userId: '',
    timestamp: new Date(''),
  });
  useEffect(() => {
    socket.on('chatMessage', (msg: ChatMessage) => {
      setMessage({ ...msg, messageType: 'message' });
    });
  }, []);

  return [message];
};
