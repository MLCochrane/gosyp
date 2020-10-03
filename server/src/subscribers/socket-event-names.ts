enum Events {
  userJoined = 'userJoined',
  userLeft = 'userLeft',
  chatMessage = 'chatMessage',
  userTyping = 'userTyping',
  addUserToRoom = 'addedToRoom',
  socketCreateRoom = 'createRoom',
  createRoomError = 'createRoomError',
  createRoomSuccess = 'createRoomSuccess',
  socketRequestsRoom = 'addMeToRoom',
  socketDeniedRoomAccess = 'notAddedToRoom',
  updatedRoomInfo = 'updatedRoomInfo',
}

export default Events;
