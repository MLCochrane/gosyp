enum Events {
  userJoined = 'userJoined',
  userLeft = 'userLeft',
  chatMessage = 'chatMessage',
  userTyping = 'userTyping',
  addUserToRoom = 'addedToRoom',
  updatedRoomInfo = 'updatedRoomInfo',
  socketCreateRoom = 'createRoom',
  createRoomError = 'createRoomError',
  createRoomSuccess = 'createRoomSuccess',
  socketRequestsRoom = 'addMeToRoom',
  socketRequestsLeaveRoom = 'removeMeFromRoom',
  socketDeniedRoomAccess = 'notAddedToRoom',
}

export default Events;
