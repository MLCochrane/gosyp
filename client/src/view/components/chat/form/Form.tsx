import React, {
  useState,
} from 'react';
import {
  socket,
} from '../../../../api';

import './form.scss';

const Form = () => {
  const [message, setMessage] = useState('');

  const handleChange = ({ target } : { target: HTMLInputElement }) => {
    setMessage(target.value);
    socket.emit('userTyping', true);
  };

  const handleBlur = () => {
    socket.emit('userTyping', false);
  };

  const formSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (message === '') return;
    socket.emit('chatMessage', message);
    socket.emit('userTyping', false);
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
        <button
          disabled={ !message.length }
          type="submit"
        >
          Send

        </button>
      </form>
    </div>
  );
};
export default Form;
