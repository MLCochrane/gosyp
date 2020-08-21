import { useEffect, useState } from 'react';
import { socket } from '../../../../api';

export const UserJoined = () => {
  const [user, setUser] = useState<UserAction>({
    user: {
      id: null,
      nickname: null,
    },
    timestamp: new Date(''),
  });
  useEffect(() => {
    socket.on('userJoined', (data: UserAction) => {
      setUser(data);
    });
  }, []);

  return [user];
};

export const UserLeft = () => {
  const [user, setUser] = useState<UserAction>({
    user: {
      id: null,
      nickname: null,
    },
    timestamp: new Date(''),
  });
  useEffect(() => {
    socket.on('userLeft', (data: UserAction) => {
      setUser(data);
    });
  }, []);

  return [user];
};
