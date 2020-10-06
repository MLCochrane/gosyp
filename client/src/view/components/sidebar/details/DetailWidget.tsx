import React from 'react';
import {
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { HasAddedToRoom } from 'view/components/lib/events/rooms';
import SwitchView from 'view/components/lib/helpers/SwitchView';
import InfoBlock from './InfoBlock';
import RoomDetails from './RoomDetails';

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
      <SwitchView trigger={ addedToRoom } current={ InfoBlock } next={ RoomDetails } />
    </Paper>
  );
};
export default DetailsWidget;
