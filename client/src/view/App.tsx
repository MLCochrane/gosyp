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
import MobileViewUtility from './components/lib/helpers/MobileViewUtility';

const App = () => {
  const [addedToRoom, roomID] = HasAddedToRoom();
  const { needsResize, shouldResize } = useSelector((state: any) => state.global);
  const [mobileStyle, setMobileStyle] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addRoomID(roomID));
    dispatch(setCurrentRoom(roomID));
  }, [dispatch, roomID, addedToRoom]);

  useEffect(() => {
    /**
     * Should set the height any time we've determined
     * it's ready to update AND on the initial setResize.
     * Initial set means we've loaded on a mobile device
     * and that's about it. Perhaps switching this for
     * something that's more clear would be a better
     * approach.
     */
    if (shouldResize || needsResize === 1) {
      setMobileStyle({
        height: window.innerHeight + 'px',
      });
    }
  }, [shouldResize, needsResize]);

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
      <MobileViewUtility />
    </div>
  );
};

export default App;
