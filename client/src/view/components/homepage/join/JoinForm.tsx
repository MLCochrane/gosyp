import React, {
  useEffect,
  useState,
} from 'react';
import {
  object,
  string,
} from 'yup';
import { socket } from 'api';
import { HasAddedToRoom } from 'view/components/lib/events/rooms';
import Events from 'view/components/lib/events/eventTypes';
import Form from 'view/components/lib/forms/Form';

const JoinForm = (): JSX.Element => {
  const [prePopulateId, setPrePopulateId] = useState('');
  const [addedToRoom, , message] = HasAddedToRoom();

  useEffect(() => {
    const [roomIdParam] = window.location.search.slice(1).split('&').map((el) => {
      const query = el.split('=');
      return (query[0] === 'roomId') ? query[1] : null;
    });

    if (roomIdParam) setPrePopulateId(roomIdParam);
  }, []);

  const handleClick = (body: FormBody) => {
    socket.emit(Events.socketRequestsRoom, body);
  };

  const schema = object().shape({
    'room-id': string().max(40).required(),
    nickname: string().max(32),
  });

  return (
    <Form
      formName="join"
      buttonText="Join Room"
      fields={
        [
          {
            name: 'room-id',
            label: 'Room ID',
            helperText: 'Room ID that has been shared with you',
            required: true,
            value: prePopulateId,
          },
          {
            name: 'nickname',
            label: 'Nickname',
            helperText: 'Optional display name',
            required: false,
          },
        ]
      }
      submissionCallback={ handleClick }
      wasSuccess={ false }
      wasError={ !addedToRoom && message !== '' }
      schema={ schema }
    />
  );
};
export default JoinForm;
