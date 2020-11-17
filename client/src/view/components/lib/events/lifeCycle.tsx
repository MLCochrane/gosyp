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
    let mounted = true;
    socket.on(Events.userJoined, (data: UserAction) => {
      if (mounted) {
        setUser(data);
      }
    });
    return () => {
      mounted = false;
    };
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
    let mounted = true;
    socket.on(Events.userLeft, (data: UserAction) => {
      if (mounted) {
        setUser(data);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return [user];
};
