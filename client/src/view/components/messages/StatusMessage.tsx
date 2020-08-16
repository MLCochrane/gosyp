import React from 'react';

const UserMessage = ({
  msg,
}: StatusUpdate) => {
  return (
    <div className='message message--status'>
      { msg }
    </div>
  )
}
export default UserMessage;
