export function addRoomID(roomID: string) {
  return {
    type: 'RECEIVE_ROOM_ID',
    roomID,
  };
}

export function setCurrentRoom(roomID: string) {
  return {
    type: 'SET_CURRENT_ROOM',
    roomID,
  };
}

export function leaveRoom(roomID: string) {
  return {
    type: 'LEAVE_ROOM',
    roomID,
  };
}
