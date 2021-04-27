import { useEffect, useState } from 'react';
import { socket } from 'api';
import Events from 'view/components/lib/events/eventTypes';

/*
 * Wondreing if it would be worthwhile to combine the HasAddedToRoom event and
 * the NotAddedToRoom event into a single one. Currently we just use the latter
 * event to send early if we find there's no room when requesting access.
 *
 * We already pass a boolean with the addedToRoom event so it's almost more
 * confusing to split this into two events. Standardizing our response from the
 * server would make this even clearer as one expects two args and the other an
 * object.
 *
 */

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
