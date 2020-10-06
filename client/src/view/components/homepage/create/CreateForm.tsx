import React, { useEffect } from 'react';
import { socket } from 'api';
import { CreateRoomSuccess, CreateRoomError } from 'view/components/lib/events/rooms';
import Events from 'view/components/lib/events/eventTypes';
import Form from 'view/components/lib/forms/Form';

const CreateForm = () => {
  const [roomSuccess] = CreateRoomSuccess();
  const [roomError] = CreateRoomError();

  useEffect(() => {
    if (roomSuccess['room-id']) {
      socket.emit(Events.socketRequestsRoom, roomSuccess);
    }
  }, [roomSuccess]);

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
              label: 'Room Name',
              name: 'name',
              helperText: 'Optional name for your chat room',
              required: false,
            },
            {
              label: 'Your Nickname',
              name: 'nickname',
              helperText: 'Optional display name',
              required: false,
            },
          ]
        }
        submissionCallback={ handleClick }
        wasSuccess={ false }
        wasError={ !!roomError.message }
      />
    </div>
  );
};
export default CreateForm;
