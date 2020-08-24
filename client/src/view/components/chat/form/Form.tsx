import React, { useState } from 'react';
import { socket } from 'api';
import Button from 'view/components/lib/forms/Button';
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
          className="button--pri"
          disabled={ !message.length }
          type="submit"
        >
          Send
        </Button>
      </form>
    </div>
  );
};
export default Form;
