import React from 'react';
import {
  Box,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => (
  {
    box: {
      textAlign: 'center',
      color: theme.palette.grey[500],
    },
  }
));

const StatusMessage = ({
  msg,
  timestamp,
}: StatusUpdate) => {
  const classes = useStyles();

  const showTime = () => {
    const timeToShow = new Date(timestamp);
    return timeToShow.toLocaleTimeString();
  };

  return (
    <Box
      className={ classes.box }
    >
      <Typography
        component="h2"
        variant="h5"
      >
        { msg }
      </Typography>
      <Typography
        component="p"
        variant="h5"
      >
        { showTime() }
      </Typography>
    </Box>
  );
};
export default StatusMessage;
