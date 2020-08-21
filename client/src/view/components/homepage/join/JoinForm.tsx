import React from 'react';
import { socket } from '../../../../api';
import { HasAddedToRoom, NotAddedToRoom } from '../../lib/events/rooms';
import Form from '../../lib/forms/Form';

const JoinForm = () => {
  const [addedToRoom] = HasAddedToRoom();
  const [notAddedToRoom] = NotAddedToRoom();

  const handleClick = (body: FormBody) => {
    socket.emit('addMeToRoom', body);
  };

  return (
    <Form
      formName="join"
      fields={
      [
        {
          name: 'room-id',
          required: true,
        },
        {
          name: 'nickname',
          required: false,
        },
      ]
    }
      submissionCallback={ handleClick }
      wasSuccess={ addedToRoom }
      wasError={ notAddedToRoom }
    />
  );
};
export default JoinForm;
