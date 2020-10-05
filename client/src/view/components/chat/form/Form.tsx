import React, { useState } from 'react';
import {
  Button,
} from '@material-ui/core';
import { socket } from 'api';
import Events from 'view/components/lib/events/eventTypes';

import './form.scss';

const Form = () => {
  const [message, setMessage] = useState('');

  const handleChange = ({ target } : { target: HTMLInputElement }) => {
    setMessage(target.value);
    socket.emit(Events.userTyping, true);
  };

  const handleBlur = () => {
    socket.emit(Events.userTyping, false);
  };

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message === '') return;
    socket.emit(Events.chatMessage, message);
    socket.emit(Events.userTyping, false);
    setMessage('');
  };

  return (
    <div className="form-wrapper chat__component">
      <form
        onSubmit={ formSubmit }
        action=""
      >
        <input
          onChange={ handleChange }
          onBlur={ handleBlur }
          value={ message }
          placeholder="Enter message..."
          type="text"
        />
        <Button
          color="primary"
          type="submit"
          variant="contained"
          disabled={ !message.length }
        >
          Send
        </Button>
      </form>
    </div>
  );
};
export default Form;
