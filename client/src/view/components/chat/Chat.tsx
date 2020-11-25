import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Feed from './Feed';
import MessageForm from './form/Form';
import TypingAlert from './TypingAlert';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
}));

const Chat = () => {
  const classes = useStyles();
  return (
    <Paper
      elevation={ 0 }
      className={ classes.paper }
      square
    >
      <Feed />
      <TypingAlert />
      <MessageForm />
    </Paper>
  );
};
export default Chat;
