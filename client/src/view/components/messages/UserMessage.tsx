import React from 'react';

const UserMessage = ({
  userId,
  msg,
} : ChatMessage) => {
  return (
    <div className='message message--user'>
      {userId}: { msg}
    </div>
  )
}
export default UserMessage;
