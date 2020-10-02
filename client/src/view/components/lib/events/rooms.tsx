import { useEffect, useState } from 'react';
import { socket } from 'api';
import Events from './eventTypes';

export const HasAddedToRoom = () : [boolean] => {
  const [addedToRoom, setAddedToRoom] = useState(false);

  useEffect(() => {
    socket.on(Events.addUserToRoom, (status: boolean) => {
      setAddedToRoom(status);
    });
  }, []);

  return [addedToRoom];
};

export const NotAddedToRoom = () : [boolean, string] => {
  const [notAdded, setNotAdded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    socket.on(Events.socketDeniedRoomAccess, ({
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

export const RoomDetailsUpdated = () : [RoomDetails] => {
  const [details, setDetails] = useState<RoomDetails>([]);

  useEffect(() => {
    socket.on(Events.updatedRoomInfo, (updatedDetails: RoomDetails) => {
      setDetails(updatedDetails);
    });
  }, []);

  return [details];
};
