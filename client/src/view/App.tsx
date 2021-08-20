import React, {
  useEffect,
  useState,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  makeStyles,
} from '@material-ui/core';
import { addRoomID, setCurrentRoom } from 'store/actions/roomActions';
import { AppState } from 'store/reducers';
import Sidebar from './components/sidebar/Sidebar';
import SwitchView from './components/lib/helpers/SwitchView';
import Home from './components/homepage/Home';
import Room from './components/chat/Room';
import { HasAddedToRoom } from './components/lib/events/rooms';
import MobileViewUtility from './components/lib/helpers/MobileViewUtility';

const useStyles = makeStyles(() => ({
  appBase: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    zIndex: 0,
  },
  pageContent: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
}));

const App = (): JSX.Element => {
  const classes = useStyles();
  const [addedToRoom, roomID] = HasAddedToRoom();
  const { needsResize, appHeight } = useSelector((state: AppState) => state.global);
  const [mobileStyle, setMobileStyle] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (addedToRoom) {
      dispatch(addRoomID(roomID));
      dispatch(setCurrentRoom(roomID));
    }
  }, [dispatch, roomID, addedToRoom]);

  useEffect(() => {
    if (needsResize === 1) {
      setMobileStyle({
        height: `${appHeight}px`,
      });
    }
  }, [needsResize, appHeight]);

  return (
    <div
      className={ classes.appBase }
      style={ mobileStyle }
    >
      <div className={ classes.pageContent }>
        <Sidebar />
        <SwitchView
          trigger={ addedToRoom }
          current={ Home }
          next={ Room }
          useAnimation={ false }
        />
      </div>
      <MobileViewUtility />
    </div>
  );
};

export default App;
