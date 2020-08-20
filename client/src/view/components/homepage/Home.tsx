import React from 'react';
import { socket } from '../../../api';
import Button from '../lib/forms/Button';
import Form from '../lib/forms/Form';

const Home = () => {
  const handleClick = () => {
    socket.emit('addMeToRoom');
  };

  return (
    <div className="home">
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
      />
    </div>
  );
};
export default Home;
