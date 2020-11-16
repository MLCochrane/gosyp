interface roomAction {
  type: 'RECEIVE_ROOM_ID' | 'SET_CURRENT_ROOM' | 'LEAVE_ROOM',
  roomID: string,
}
export default function reducer(state = {
  rooms: {},
  currentRoom: '',
}, action: roomAction) {
  switch (action.type) {
    case 'RECEIVE_ROOM_ID': {
      return {
        ...state,
        rooms: Object.assign({}, state.rooms, { [action.roomID]: action.roomID }),
      };
    }
    case 'SET_CURRENT_ROOM': {
      return {
        ...state,
        currentRoom: action.roomID,
      };
    }
    case 'LEAVE_ROOM': {
      const actionRoom = action.roomID;
      let clearCurrent = false;
      if (actionRoom === state.currentRoom) {
        clearCurrent = true;
      }
      const roomsCopy: {[key: string]: string} = {...state.rooms};
      delete roomsCopy[actionRoom];
      return {
        ...state,
        currentRoom: clearCurrent ? '' : state.currentRoom,
        rooms: roomsCopy,
      };
    }
    default:
      return state;
  }
}