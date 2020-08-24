import React, {
  useEffect, useState,
} from 'react';
import TypingUpdate from 'view/components/lib/events/typingStatus';

const TypingStatus = () => {
  const [isTyping] = TypingUpdate();
  const [typingStatus, setTypingStatus] = useState<String>('');

  useEffect(() => {
    if (isTyping) {
      setTypingStatus('Someone is typing...');
    }

    return () => setTypingStatus('');
  }, [isTyping]);
  return (
    <div className="typing-status chat__component alt-type">
      { typingStatus }
    </div>
  );
};
export default TypingStatus;
