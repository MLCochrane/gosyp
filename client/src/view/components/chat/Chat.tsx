import React, {
  useEffect,
  useState,
} from 'react';
import {
  useSelector,
} from 'react-redux';
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
  const { needsResize } = useSelector((state: any) => state.global);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, [needsResize]);

  const classes = useStyles();
  return (
    <Paper
      elevation={ 0 }
      className={ classes.paper }
      square
      style={{
        height: windowHeight + 'px',
      }}
    >
      <Feed />
      <TypingAlert />
      <MessageForm />
    </Paper>
  );
};
export default Chat;
