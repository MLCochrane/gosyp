import React from 'react';
import {
  object,
  string,
} from 'yup';
import { socket } from 'api';
import { NotAddedToRoom } from 'view/components/lib/events/rooms';
import Events from 'view/components/lib/events/eventTypes';
import Form from 'view/components/lib/forms/Form';

const JoinForm = () => {
  const [notAddedToRoom] = NotAddedToRoom();

  const handleClick = (body: FormBody) => {
    socket.emit(Events.socketRequestsRoom, body);
  };

  const schema = object().shape({
    'room-id': string().max(40).required(),
    nickname: string().max(32),
  });

  return (
    <div className="join-form">
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
        wasError={ notAddedToRoom }
        schema={ schema }
      />
    </div>
  );
};
export default JoinForm;
