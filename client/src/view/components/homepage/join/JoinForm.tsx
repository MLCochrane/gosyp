import React from 'react';
import { socket } from '../../../../api';
import { HasAddedToRoom, NotAddedToRoom } from '../../lib/events/rooms';
import Events from '../../lib/events/eventTypes';
import Form from '../../lib/forms/Form';

const JoinForm = () => {
  const [addedToRoom] = HasAddedToRoom();
  const [notAddedToRoom] = NotAddedToRoom();

  const handleClick = (body: FormBody) => {
    socket.emit(Events.socketRequestsRoom, body);
  };

  return (
    <div className="join-form">
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
    </div>
  );
};
export default JoinForm;
