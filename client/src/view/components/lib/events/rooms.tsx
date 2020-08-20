import { useEffect, useState } from 'react';
import { socket } from '../../../../api';

export default () => {
  const [addedToRoom, setAddedToRoom] = useState(false);

  useEffect(() => {
    socket.on('addedToRoom', (status: boolean) => {
      setAddedToRoom(status);
    });
  }, []);

  return [addedToRoom];
};
