interface roomAction {
  type: 'RECEIVE_ROOM_ID' | 'SET_CURRENT_ROOM',
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
    default:
      return state;
  }
}