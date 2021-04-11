import { useEffect, useState } from 'react';
import { socket } from 'api';
import Events from './eventTypes';

export const HasAddedToRoom = () : [boolean, string] => {
  const [addedToRoom, setAddedToRoom] = useState(false);
  const [roomID, setRoomID] = useState('');

  useEffect(() => {
    let mounted = true;
    socket.on(Events.addUserToRoom, (status: boolean, id: string) => {
      if (mounted) {
        setAddedToRoom(status);
        setRoomID(id);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return [addedToRoom, roomID];
};

export const NotAddedToRoom = () : [boolean, string] => {
  const [notAdded, setNotAdded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let mounted = true;
    socket.on(Events.socketDeniedRoomAccess, ({
      status,
      message,
    } : {
      status: boolean,
      message: string,
    }) => {
      if (mounted) {
        setNotAdded(status);
        setErrorMessage(message);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return [notAdded, errorMessage];
};

export const CreateRoomSuccess = () : [{ 'room-id': string, nickname: string | null }] => {
  const [responseMessage, setResponseMessage] = useState<{ 'room-id': string, nickname: string | null }>({
    'room-id': '',
    nickname: null,
  });

  useEffect(() => {
    let cancelled = false;
    socket.on(Events.createRoomSuccess, ({
      message,
    } : {
      message: RoomFieldsInterface,
    }) => {
      if (!cancelled) {
        setResponseMessage({
          'room-id': message.uuid,
          nickname: message.nickname || null,
        });
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return [responseMessage];
};

export const CreateRoomError = () : [DefaultMessage] => {
  const [errorMessage, setErrorMessage] = useState<DefaultMessage>({ message: '' });

  useEffect(() => {
    socket.on(Events.createRoomError, ({
      message,
    } : {
      message: DefaultMessage,
    }) => {
      setErrorMessage(message);
    });
  }, []);

  return [errorMessage];
};

export const RoomDetailsUpdated = () : [RoomDetails] => {
  const [details, setDetails] = useState<RoomDetails>([]);

  useEffect(() => {
    let mounted = true;
    socket.on(Events.updatedRoomInfo, ({ roomDetails }: { roomDetails: RoomDetails }) => {
      if (mounted) {
        setDetails(roomDetails);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return [details];
};
