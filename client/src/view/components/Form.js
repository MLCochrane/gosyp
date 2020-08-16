import React, {
  useState,
} from 'react';
import {
  socket
} from '../../api';

const Form = () => {
  const [message, setMessage] = useState('');

  const handleChange = ({ target }) => {
    setMessage(target.value);
  }

  const formSubmit = (e) => {
    e.preventDefault();

    socket.emit('chatMessage', message);
    setMessage('');
  }

  return (
    <div className="form">
      <form
        onSubmit={ formSubmit }
        action="">
          <input
            onChange={ handleChange }
            value={ message }
            type="text"/>
          <button type="submit">Send</button>
      </form>
    </div>
  )
}
export default Form;
