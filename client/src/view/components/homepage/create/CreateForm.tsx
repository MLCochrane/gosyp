import React, { useEffect } from 'react';
import {
  object,
  string,
} from 'yup';
import { socket } from 'api';
import { CreateRoomSuccess, CreateRoomError } from 'view/components/lib/events/rooms';
import { EventNames as Events } from 'typings';
import Form from 'view/components/lib/forms/Form';

const CreateForm = (): JSX.Element => {
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

  const schema = object().shape({
    name: string().max(32),
    nickname: string().max(32),
  });

  return (
    <div className="create-form">
      <Form
        formName="create"
        buttonText="Create Room"
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
        schema={ schema }
      />
    </div>
  );
};
export default CreateForm;
