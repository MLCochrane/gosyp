import React, {
  useEffect,
  useState,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import Sidebar from './components/sidebar/Sidebar';
import SwitchView from './components/lib/helpers/SwitchView';
import Home from './components/homepage/Home';
import Room from './components/chat/Room';
import { HasAddedToRoom } from './components/lib/events/rooms';
import { addRoomID, setCurrentRoom } from 'store/actions/roomActions';
import {
  setNeedsResize,
  mobileDetect,
} from 'store/actions/globalActions';
import { MobileCheck } from './components/lib/helpers/windowEvents';

const App = () => {
  const [addedToRoom, roomID] = HasAddedToRoom();
  const [smallScreen] = MobileCheck();
  const { needsResize, isMobile } = useSelector((state: any) => state.global);
  const [mobileStyle, setMobileStyle] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addRoomID(roomID));
    dispatch(setCurrentRoom(roomID));
  }, [dispatch, roomID, addedToRoom]);

  useEffect(() => {
    if (smallScreen) {
      dispatch(mobileDetect(true));
      dispatch(setNeedsResize());
    } else {
      dispatch(mobileDetect(false));
    }
  }, [dispatch, smallScreen]);

  useEffect(() => {
    if (needsResize && isMobile) {
      setMobileStyle({
        height: window.innerHeight + 'px',
      });
    }
  }, [needsResize, isMobile]);

  return (
    <div
      className="app"
      style={ mobileStyle }
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
