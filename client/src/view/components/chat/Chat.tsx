import React from 'react';
import Feed from './Feed';
import Form from './form/Form';
import TypingAlert from './TypingAlert';

import './chat.scss';

const Chat = () => (
  <main className="chat">
    <Feed />
    <TypingAlert />
    <Form />
  </main>
);
export default Chat;
