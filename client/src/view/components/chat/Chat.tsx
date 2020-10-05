import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Feed from './Feed';
import MessageForm from './form/Form';
import TypingAlert from './TypingAlert';

import './chat.scss';

const useStyles = makeStyles({
  paper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});

const Chat = () => {
  const classes = useStyles();
  return (
    <Paper
      elevation={ 0 }
      className={ classes.paper }
    >
      <Feed />
      <TypingAlert />
      <MessageForm />
    </Paper>
  );
};
export default Chat;
