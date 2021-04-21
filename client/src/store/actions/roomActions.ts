export interface RoomActionInterface {
  type: 'RECEIVE_ROOM_ID' | 'SET_CURRENT_ROOM' | 'LEAVE_ROOM',
  roomID: string,
}

export function addRoomID(roomID: string): RoomActionInterface {
  return {
    type: 'RECEIVE_ROOM_ID',
    roomID,
  };
}

export function setCurrentRoom(roomID: string): RoomActionInterface {
  return {
    type: 'SET_CURRENT_ROOM',
    roomID,
  };
}

export function leaveRoom(roomID: string): RoomActionInterface {
  return {
    type: 'LEAVE_ROOM',
    roomID,
  };
}
