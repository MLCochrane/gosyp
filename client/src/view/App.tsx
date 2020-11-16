import React, {
  useEffect,
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

const App = () => {
  const [addedToRoom, roomID] = HasAddedToRoom();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addRoomID(roomID));
    dispatch(setCurrentRoom(roomID));
  }, [dispatch, roomID, addedToRoom]);

  return (
    <div className="app">
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
