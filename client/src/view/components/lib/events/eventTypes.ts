enum Events {
  userJoined = 'userJoined',
  userLeft = 'userLeft',
  chatMessage = 'chatMessage',
  userTyping = 'userTyping',
  addUserToRoom = 'addedToRoom',
  updatedRoomInfo = 'updatedRoomInfo',
  socketCreateRoom = 'createRoom',
  createRoomSuccess = 'createRoomSuccess',
  socketRequestsRoom = 'addMeToRoom',
  socketRequestsLeaveRoom = 'removeMeFromRoom',
}

export default Events;
