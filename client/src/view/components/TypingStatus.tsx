import React, {
  useEffect, useState,
} from 'react';
import TypingUpdate from './lib/events/typingStatus';

const TypingStatus = () => {
  const [isTyping] = TypingUpdate();
  const [typingStatus, setTypingStatus] = useState<String>('');

  useEffect(() => {
    if (isTyping) {
      setTypingStatus('Someone is typing');
    }

    return () => setTypingStatus('');
  }, [isTyping]);
  return (
    <div className="typing-status">
      { typingStatus }
    </div>
  )
}
export default TypingStatus;
