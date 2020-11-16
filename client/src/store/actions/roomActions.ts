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
