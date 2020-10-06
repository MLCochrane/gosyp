import React from 'react';
import { socket } from 'api';
import { NotAddedToRoom } from 'view/components/lib/events/rooms';
import Events from 'view/components/lib/events/eventTypes';
import Form from 'view/components/lib/forms/Form';

const JoinForm = () => {
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
        wasSuccess={ false }
        wasError={ notAddedToRoom }
      />
    </div>
  );
};
export default JoinForm;
