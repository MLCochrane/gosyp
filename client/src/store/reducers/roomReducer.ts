import { RoomActionInterface } from '../actions/roomActions';

export interface RoomsReducerInterface {
  rooms: {
    [key: string]: string,
  },
  currentRoom: string,
}

export default function reducer(state = {
  rooms: {},
  currentRoom: '',
}, action: RoomActionInterface): RoomsReducerInterface {
  switch (action.type) {
    case 'RECEIVE_ROOM_ID': {
      return {
        ...state,
        rooms: { ...state.rooms, [action.roomID]: action.roomID },
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
      const roomsCopy: {[key: string]: string} = { ...state.rooms };
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
