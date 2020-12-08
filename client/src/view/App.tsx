import React, {
  useEffect,
  useState,
} from 'react';
import {
  useDispatch,
} from 'react-redux';
import Sidebar from './components/sidebar/Sidebar';
import SwitchView from './components/lib/helpers/SwitchView';
import Home from './components/homepage/Home';
import Room from './components/chat/Room';
import { HasAddedToRoom } from './components/lib/events/rooms';
import { addRoomID, setCurrentRoom } from 'store/actions/roomActions';
import { setNeedsResize } from 'store/actions/globalActions';
import resizeEvent from './components/lib/helpers/windowEvents';

const App = () => {
  const [addedToRoom, roomID] = HasAddedToRoom();
  const [isResizing] = resizeEvent();
  const [windowHeight, setWindowHeight] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addRoomID(roomID));
    dispatch(setCurrentRoom(roomID));
  }, [dispatch, roomID, addedToRoom]);

  useEffect(() => {
    if (isResizing) {
      dispatch(setNeedsResize(true));
    } else {
      dispatch(setNeedsResize(false));
    }
  }, [dispatch, isResizing]);

  useEffect(() => {
    if(!isResizing) setWindowHeight(window.innerHeight);
  }, [isResizing]);

  return (
    <div
      className="app"
      style={{
        height: windowHeight + 'px',
      }}
    >
      <div className="page-content">
        <Sidebar />
        <SwitchView
          trigger={ addedToRoom }
          current={ Home }
          next={ Room }
          useAnimation={ false }
        />
      </div>
    </div>
  );
};

export default App;
