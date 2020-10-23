import React from 'react';
import {
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { HasAddedToRoom } from 'view/components/lib/events/rooms';
import SwitchView from 'view/components/lib/helpers/SwitchView';
import InfoBlock from './InfoBlock';
import RoomDetails from './RoomDetails';
import ErrorBoundry from 'view/components/lib/helpers/ErrorBoundary';

const useStyles = makeStyles({
  paper: {
    flexGrow: 1,
  },
});

const DetailsWidget = () => {
  const classes = useStyles();
  const [addedToRoom] = HasAddedToRoom();

  return (
    <Paper
      elevation={ 0 }
      className={ classes.paper }
    >
      <ErrorBoundry>
        <SwitchView
          trigger={ addedToRoom }
          current={ InfoBlock }
          next={ RoomDetails }
          useAnimation={ false }
          />
      </ErrorBoundry>
    </Paper>
  );
};
export default DetailsWidget;
