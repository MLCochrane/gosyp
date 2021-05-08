import { useEffect, useState } from 'react';
import { socket } from 'api';
import Events from 'view/components/lib/events/eventTypes';

export const UserJoined = (): [UserAction] => {
  const [user, setUser] = useState<UserAction>({
    user: {
      id: null,
      nickname: null,
    },
    timestamp: new Date(''),
  });

  useEffect(() => {
    let mounted = true;
    socket.on(Events.userJoined, (response: ResponseInterface) => {
      if (mounted) {
        const { status, data } = response;
        if (status === 'success') {
          const userData: UserAction = data.userAction as UserAction;
          setUser(userData);
        }
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return [user];
};

export const UserLeft = (): [UserAction] => {
  const [user, setUser] = useState<UserAction>({
    user: {
      id: null,
      nickname: null,
    },
    timestamp: new Date(''),
  });
  useEffect(() => {
    let mounted = true;
    socket.on(Events.userLeft, (response: ResponseInterface) => {
      if (mounted) {
        const { status, data } = response;
        if (status === 'success') {
          const userData: UserAction = data.userAction as UserAction;
          setUser(userData);
        }
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return [user];
};
