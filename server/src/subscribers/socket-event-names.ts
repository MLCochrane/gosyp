enum Events {
  userJoined = 'userJoined',
  userLeft = 'userLeft',
  chatMessage = 'chatMessage',
  userTyping = 'userTyping',
  addUserToRoom = 'addedToRoom',
  socketCreateRoom = 'createRoom',
  createRoomSuccess = 'createRoomSuccess',
  socketRequestsRoom = 'addMeToRoom',
  socketRequestsLeaveRoom = 'removeMeFromRoom',
  updatedRoomInfo = 'updatedRoomInfo',
}

export default Events;
