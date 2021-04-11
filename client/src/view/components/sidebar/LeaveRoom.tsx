import React from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import {
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExitToApp } from '@material-ui/icons';
import { socket } from 'api';
import { EventNames as Events } from 'typings';
import { leaveRoom } from 'store/actions/roomActions';
import { AppState } from 'store/reducers';

const useStyles = makeStyles((theme) => (
  {
    icon: {
      transform: 'rotate(180deg)',
    },
    buttonText: {
      [theme.breakpoints.up('lg')]: {
        display: 'none',
      },
    },
  }
));

const LeaveRoom = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentRoom: roomID } = useSelector((state: AppState) => state.rooms);

  const handleClick = () => {
    socket.emit(Events.socketRequestsLeaveRoom, roomID);
    dispatch(leaveRoom(roomID));
  };

  return (
    <Tooltip
      title="Leave room"
      placement="top"
    >
      <IconButton
        aria-label="leave current chat room"
        onClick={ handleClick }
      >
        <ExitToApp
          fontSize="large"
          className={ classes.icon }
        />
        <Typography
          className={ classes.buttonText }
        >
          Leave Room
        </Typography>
      </IconButton>
    </Tooltip>
  );
};
export default LeaveRoom;
