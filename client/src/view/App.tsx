import React from 'react';
import {
  Grid,
} from '@material-ui/core';
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
        <Grid
          container
          spacing={ 0 }
        >
          <Grid item xs={ addedToRoom ? 3 : true }>
            <Sidebar />
          </Grid>
          <Grid item xs>
            <SwitchView trigger={ addedToRoom } current={ Home } next={ Room } />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default App;
