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

export const CreateRoomSuccess = () : [any] => {
  const [responseMessage, setResponseMessage] = useState<any>({});

  useEffect(() => {
    socket.on(Events.createRoomSuccess, ({
      message,
    } : {
      message: any,
    }) => {
      setResponseMessage({
        'room-id': message.uuid,
      });
    });
  }, []);

  return [responseMessage];
};

export const CreateRoomError = () : [any] => {
  const [errorMessage, setErrorMessage] = useState<any>({});

  useEffect(() => {
    socket.on(Events.createRoomError, ({
      message,
    } : {
      message: any,
    }) => {
      setErrorMessage(message);
    });
  }, []);

  return [errorMessage];
};

export const RoomDetailsUpdated = () : [RoomDetails] => {
  const [details, setDetails] = useState<RoomDetails>([]);

  useEffect(() => {
    socket.on(Events.updatedRoomInfo, ({ roomDetails }: { roomDetails: RoomDetails }) => {
      setDetails(roomDetails);
    });
  }, []);

  return [details];
};
