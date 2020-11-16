import React from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import { IconButton } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import { socket } from 'api';
import Events from 'view/components/lib/events/eventTypes';
import { leaveRoom } from 'store/actions/roomActions';

const LeaveRoom = () => {
  const dispatch = useDispatch();
  const { currentRoom: roomID } = useSelector((state: any) => state.rooms);

  const handleClick = () => {
    socket.emit(Events.socketRequestsLeaveRoom, roomID);
    dispatch(leaveRoom(roomID));
  };

  return (
    <IconButton
      onClick={ handleClick }
    >
      <ExitToApp />
    </IconButton>
  )
}
export default LeaveRoom;