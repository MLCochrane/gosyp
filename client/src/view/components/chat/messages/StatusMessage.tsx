import React from 'react';

const StatusMessage = ({
  msg,
  timestamp,
}: StatusUpdate) => {
  const showTime = () => {
    const timeToShow = new Date(timestamp);
    return timeToShow.toLocaleTimeString();
  };

  return (
    <div className="message message--status status-message">
      <h2 className="status-message__message alt-type">{ msg }</h2>
      <p className="status-message__time alt-type">{ showTime() }</p>
    </div>
  );
};
export default StatusMessage;
