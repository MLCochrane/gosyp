import { useEffect, useState } from 'react';
import { socket } from 'api';

export const HasAddedToRoom = () : [boolean] => {
  const [addedToRoom, setAddedToRoom] = useState(false);

  useEffect(() => {
    socket.on('addedToRoom', (status: boolean) => {
      setAddedToRoom(status);
    });
  }, []);

  return [addedToRoom];
};

export const NotAddedToRoom = () : [boolean, string] => {
  const [notAdded, setNotAdded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    socket.on('notAddedToRoom', ({
      status,
      message,
    } : {
      status: boolean,
      message: string,
    }) => {
      setNotAdded(status);
      setErrorMessage(message);
    });
  }, []);

  return [notAdded, errorMessage];
};
