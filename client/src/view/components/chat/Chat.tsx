import React, {
  useEffect,
  useState,
} from 'react';
import {
  useSelector,
} from 'react-redux';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AppState } from 'store/reducers';
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

const Chat = (): JSX.Element => {
  const { needsResize, appHeight } = useSelector((state: AppState) => state.global);
  const [mobileStyle, setMobileStyle] = useState({});

  /**
   * This should update the height on page load and
   * any time that the window sends a "resize" event.
   * On mobile, I believe the resize event is sent
   * when the keyboard opens/closes and on rotate.
   */
  useEffect(() => {
    if (needsResize === 1) {
      setMobileStyle({
        height: `${appHeight}px`,
      });
    }
  }, [needsResize, appHeight]);

  const classes = useStyles();
  return (
    <Paper
      elevation={ 0 }
      className={ classes.paper }
      square
      style={ mobileStyle }
    >
      <Feed />
      <TypingAlert />
      <MessageForm />
    </Paper>
  );
};
export default Chat;
