import React, {
  useEffect,
  useState,
} from 'react';
import {
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { RoomDetailsUpdated } from '../lib/events/rooms';

const useStyles = makeStyles(() => ({
  title: {
    color: 'white',
  },
}));

const TitleBar = (): JSX.Element => {
  const classes = useStyles();
  const [details] = RoomDetailsUpdated();
  const [title, setTitle] = useState<string>('gosyp.io');

  useEffect(() => {
    setTitle(title);
  }, [details]);

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
