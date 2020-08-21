enum Events {
  userJoined = 'userJoined',
  userLeft = 'userLeft',
  chatMessage = 'chatMessage',
  userTyping = 'userTyping',
  addUserToRoom = 'addedToRoom',
  socketRequestsRoom = 'addMeToRoom',
  socketDeniedRoomAccess = 'notAddedToRoom',
}

export default Events;
