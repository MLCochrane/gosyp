import React, {
  useEffect,
  useState,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Feed from './Feed';
import MessageForm from './form/Form';
import TypingAlert from './TypingAlert';
import { setHasResized } from 'store/actions/globalActions';

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
  const dispatch = useDispatch();
  const { shouldResize, needsResize } = useSelector((state: any) => state.global);
  const [mobileStyle, setMobileStyle] = useState({});

  /**
   * This should update the height on page load and
   * any time that the window sends a "resize" event.
   * On mobile, I believe the resize event is sent
   * when the keyboard opens/closes and on rotate.
   */
  useEffect(() => {
    if (shouldResize || needsResize === 1) {
      setMobileStyle({
        height: window.innerHeight + 'px',
      });
      dispatch(setHasResized());
    }
  }, [shouldResize, needsResize, dispatch]);

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
