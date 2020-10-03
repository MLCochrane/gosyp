import React from 'react';
import { socket } from 'api';
import { CreateRoomSuccess, CreateRoomError } from 'view/components/lib/events/rooms';
import Events from 'view/components/lib/events/eventTypes';
import Form from 'view/components/lib/forms/Form';

const CreateForm = () => {
  const [roomSuccess] = CreateRoomSuccess();
  const [roomError] = CreateRoomError();

  const handleClick = (body: FormBody) => {
    socket.emit(Events.socketCreateRoom, body);
  };

  return (
    <div className="create-form">
      <Form
        formName="create"
        fields={
          [
            {
              name: 'name',
              required: false,
            },
            {
              name: 'nickname',
              required: false,
            },
          ]
        }
        submissionCallback={ handleClick }
        wasSuccess={ false }
        wasError={ false }
      />
    </div>
  );
};
export default CreateForm;
