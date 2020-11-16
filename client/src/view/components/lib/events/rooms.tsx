import { useEffect, useState } from 'react';
import { socket } from 'api';
import Events from './eventTypes';

export const HasAddedToRoom = () : [boolean, string] => {
  const [addedToRoom, setAddedToRoom] = useState(false);
  const [roomID, setRoomID] = useState('');

  useEffect(() => {
    socket.on(Events.addUserToRoom, (status: boolean, id: string) => {
      setAddedToRoom(status);
      setRoomID(id);
    });
  }, []);

  return [addedToRoom, roomID];
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
    let cancelled = false;
    socket.on(Events.createRoomSuccess, ({
      message,
    } : {
      message: any,
    }) => {
      if (!cancelled) {
        setResponseMessage({
          'room-id': message.uuid,
          nickname: message.nickname,
        });
      }
    });
    return () => {
      cancelled = true;
    };
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
