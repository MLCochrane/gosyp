import { useEffect, useState } from 'react';
import { socket } from 'api';
import Events from './eventTypes';

export default (): [ChatMessage] => {
  const [message, setMessage] = useState<ChatMessage>({
    messageType: 'message',
    id: '',
    msg: '',
    user: {
      id: '',
      nickname: null,
    },
    timestamp: new Date(''),
  });
  useEffect(() => {
    let mounted = true;
    socket.on(Events.chatMessage, (response: ResponseInterface) => {
      if (mounted) {
        const msg: ChatMessage = response.data.msg as ChatMessage;
        setMessage({ ...msg, messageType: 'message' });
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return [message];
};
