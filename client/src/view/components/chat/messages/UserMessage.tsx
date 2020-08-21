import React from 'react';

import './userMessage.scss';

const UserMessage = ({
  user,
  msg,
  timestamp,
} : ChatMessage) => {
  const displayName = user.nickname || user.id;

  const showTime = () => {
    const timeToShow = new Date(timestamp);
    return timeToShow.toLocaleTimeString();
  };
  return (
    <div className="message message--user user-message">
      <div className="user-message__meta">
        <h2 className="user-message__name body-type">{ displayName }</h2>
        <p className="user-message__time meta-type">{ showTime() }</p>
      </div>
      <p className="user-message__message">{ msg }</p>
    </div>
  );
};
export default UserMessage;
