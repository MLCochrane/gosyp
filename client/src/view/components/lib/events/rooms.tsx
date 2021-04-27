import { useEffect, useState } from 'react';
import { socket } from 'api';
import Events from 'view/components/lib/events/eventTypes';

export const HasAddedToRoom = () : [boolean, string, string] => {
  const [addedToRoom, setAddedToRoom] = useState(false);
  const [roomID, setRoomID] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    let mounted = true;
    socket.on(Events.addUserToRoom, (response: ResponseInterface) => {
      if (mounted) {
        const { status, data } = response;
        if (status === 'success') {
          setAddedToRoom(true);
          setRoomID(data.roomID as string);
        } else if (status === 'failure') {
          setAddedToRoom(false);
          setMessage(data.message as string);
        } else if (status === 'error') {
          setAddedToRoom(false);
          setMessage(data.message as string);
        }
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return [addedToRoom, roomID, message];
};

export const CreateRoomSuccess = () : [ResponseStatus | null, { 'room-id': string, nickname: string | null }, Error | null] => {
  const [serverStatus, setStatus] = useState<ResponseStatus | null>(null);
  const [responseMessage, setResponseMessage] = useState<{'room-id': string, nickname: string | null }>({
    'room-id': '',
    nickname: null,
  });
  const [errorMessage, setErrorMessage] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    socket.on(Events.createRoomSuccess, (response: ResponseInterface) => {
      if (mounted) {
        const { data, status } = response;
        if (response.status === 'success') {
          const msg = data.room as RoomFieldsInterface;
          setStatus(status);
          setResponseMessage({
            'room-id': msg.uuid,
            nickname: msg.nickname || null,
          });
        } else if (response.status === 'error') {
          const msg = data.message as Error;
          setStatus(status);
          setErrorMessage(msg);
        }
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return [serverStatus, responseMessage, errorMessage];
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
