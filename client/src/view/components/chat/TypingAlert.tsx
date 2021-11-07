import React, {
  useEffect,
  useState,
} from 'react';
import {
  makeStyles,
  Typography,
} from '@material-ui/core';
import TypingUpdate from 'view/components/lib/events/typingStatus';

const useStyles = makeStyles((theme) => (
  {
    typingStatus: {
      height: '40px',
      padding: '10px 0',
      color: theme.palette.text.secondary,
    },
  }
));

const TypingStatus = (): JSX.Element => {
  const classes = useStyles();
  const [isTyping] = TypingUpdate();
  const [typingStatus, setTypingStatus] = useState<string>('');

  useEffect(() => {
    if (isTyping) {
      setTypingStatus('Someone is typing...');
    }

    return () => setTypingStatus('');
  }, [isTyping]);

  return (
    <div className={ classes.typingStatus }>
      <Typography>
        { typingStatus }
      </Typography>
    </div>
  );
};
export default TypingStatus;
