import React from 'react';
import Feed from './Feed';
import Form from './form/Form';
import TypingStatus from './TypingStatus';

import './chat.scss';

const Chat = () => (
  <main className="chat">
    <Feed />
    <TypingStatus />
    <Form />
  </main>
);
export default Chat;
