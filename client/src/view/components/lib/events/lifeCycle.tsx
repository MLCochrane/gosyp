import { useEffect, useState } from 'react';
import { socket } from 'api';
import Events from './eventTypes';

export const UserJoined = () => {
  const [user, setUser] = useState<UserAction>({
    user: {
      id: null,
      nickname: null,
    },
    timestamp: new Date(''),
  });
  useEffect(() => {
    socket.on(Events.userJoined, (data: UserAction) => {
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
    socket.on(Events.userLeft, (data: UserAction) => {
      setUser(data);
    });
  }, []);

  return [user];
};
