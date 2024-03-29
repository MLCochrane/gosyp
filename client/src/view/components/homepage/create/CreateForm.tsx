import React, { useEffect } from 'react';
import {
  object,
  string,
} from 'yup';
import { socket } from 'api';
import { CreateRoomSuccess } from 'view/components/lib/events/rooms';
import Events from 'view/components/lib/events/eventTypes';
import Form from 'view/components/lib/forms/Form';

const CreateForm = (): JSX.Element => {
  const [status, roomSuccess, error] = CreateRoomSuccess();

  useEffect(() => {
    if (status === 'success') {
      socket.emit(Events.socketRequestsRoom, roomSuccess);
    }
  }, [status, roomSuccess]);

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
        wasError={ error != null }
        schema={ schema }
      />
    </div>
  );
};
export default CreateForm;
