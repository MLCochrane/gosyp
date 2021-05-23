import React, {
  useEffect,
  useState,
} from 'react';
import {
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { HasAddedToRoom, RoomDetailsUpdated } from '../lib/events/rooms';

const useStyles = makeStyles((theme) => ({
  title: {
    color: 'black',
    [theme.breakpoints.up('lg')]: {
      color: 'white',
    },
  },
}));

const TitleBar = (): JSX.Element => {
  const siteTitle = 'gosyp.io';
  const classes = useStyles();
  const [details] = RoomDetailsUpdated();
  const [inRoom, , message] = HasAddedToRoom();
  const [title, setTitle] = useState<string>(siteTitle);

  useEffect(() => {
    /**
     * Unsure if displaying room ID in place of an unset room name provides any
     * value or if simply showing the "N/A" will suffice.
     */

    if (details.length) {
      const roomName = details.filter((el) => el.name === 'Room Name');
      const roomTitle = `Room Name: ${roomName[0].value}`;
      setTitle(roomTitle);
    }
  }, [details]);

  useEffect(() => {
    if (!inRoom && message === 'Removed from room') {
      setTitle(siteTitle);
    }
  }, [inRoom, message]);

  return (
    <Typography
      variant="h5"
      component="h1"
      className={ classes.title }
    >
      { title }
    </Typography>
  );
};

export default TitleBar;
