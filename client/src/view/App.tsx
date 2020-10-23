import React from 'react';
import Sidebar from './components/sidebar/Sidebar';
import SwitchView from './components/lib/helpers/SwitchView';
import Home from './components/homepage/Home';
import Room from './components/chat/Room';
import { HasAddedToRoom } from './components/lib/events/rooms';

const App = () => {
  const [addedToRoom] = HasAddedToRoom();

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
