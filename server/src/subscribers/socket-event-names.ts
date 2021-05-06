enum Events {
  userJoined = 'userJoined',
  userLeft = 'userLeft',
  chatMessage = 'chatMessage',
  userTyping = 'userTyping',
  addUserToRoom = 'addedToRoom',
  userRemovedFromRoom = 'removedFromRoom',
  socketCreateRoom = 'createRoom',
  createRoomError = 'createRoomError',
  createRoomSuccess = 'createRoomSuccess',
  socketRequestsRoom = 'addMeToRoom',
  socketRequestsLeaveRoom = 'removeMeFromRoom',
  socketDeniedRoomAccess = 'notAddedToRoom',
  updatedRoomInfo = 'updatedRoomInfo',
}

export default Events;
