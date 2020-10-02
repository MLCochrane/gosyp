enum Events {
  userJoined = 'userJoined',
  userLeft = 'userLeft',
  chatMessage = 'chatMessage',
  userTyping = 'userTyping',
  addUserToRoom = 'addedToRoom',
  updatedRoomInfo = 'updatedRoomInfo',
  socketRequestsRoom = 'addMeToRoom',
  socketDeniedRoomAccess = 'notAddedToRoom',
}

export default Events;
