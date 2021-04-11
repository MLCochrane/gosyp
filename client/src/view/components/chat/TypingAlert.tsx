import React, {
  useEffect, useState,
} from 'react';
import {
  Typography,
} from '@material-ui/core';
import TypingUpdate from 'view/components/lib/events/typingStatus';

const TypingStatus = (): JSX.Element => {
  const [isTyping] = TypingUpdate();
  const [typingStatus, setTypingStatus] = useState<string>('');

  useEffect(() => {
    if (isTyping) {
      setTypingStatus('Someone is typing...');
    }

    return () => setTypingStatus('');
  }, [isTyping]);
  return (
    <div className="typing-status chat__component alt-type">
      <Typography>
        { typingStatus }
      </Typography>
    </div>
  );
};
export default TypingStatus;
