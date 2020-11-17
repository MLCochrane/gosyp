import React from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { socket } from 'api';

const useStyles = makeStyles((theme) => (
  {
    currentSocketMessage: {
      color: theme.palette.secondary.light,
    },
    meta: {
      justifyContent: 'space-between',
    },
    hideMeta: {
      display: 'none',
    },
  }
));

const UserMessage = ({
  user,
  msg,
  timestamp,
  hideMeta,
} : ChatMessage) => {
  const classes = useStyles();
  const displayName = user.nickname || user.id;

  const showTime = () => {
    const timeToShow = new Date(timestamp);
    return timeToShow.toLocaleTimeString();
  };
  return (
    <div className={`message message--user user-message ${ socket.id === user.id ? classes.currentSocketMessage : '' }`}>
      <Grid
        container
        className={ `${classes.meta} ${hideMeta ? classes.hideMeta : ''}` }
      >
        <Grid
          item
        >
          <Typography
            variant="h6"
            component="p"
          >
            { displayName }
          </Typography>
        </Grid>
        <Grid
          item
        >
          <Typography
            variant="h6"
            component="span"
          >
            { showTime() }
          </Typography>
        </Grid>

      </Grid>
      <Typography>
        { msg }
      </Typography>
    </div>
  );
};
export default UserMessage;
