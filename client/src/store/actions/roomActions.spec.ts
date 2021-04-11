import { addRoomID, setCurrentRoom, leaveRoom } from './roomActions';
import { SET_CURRENT_ROOM, RECEIVE_ROOM_ID, LEAVE_ROOM } from '../constants';

describe('Room Actions', () => {
  it('should create an action to add a new room ID', () => {
    const roomOne = '85198159';
    const expectedActionOne = {
      type: RECEIVE_ROOM_ID,
      roomID: roomOne,
    };
    expect(addRoomID(roomOne)).toEqual(expectedActionOne);

    const roomTwo = '159159';
    const expectedActionTwo = {
      type: RECEIVE_ROOM_ID,
      roomID: roomTwo,
    };
    expect(addRoomID(roomTwo)).toEqual(expectedActionTwo);
  });

  it('should create an action to set the current room ID', () => {
    const roomID = '151515';
    const expectedAction = {
      type: SET_CURRENT_ROOM,
      roomID,
    };
    expect(setCurrentRoom(roomID)).toEqual(expectedAction);
  });

  it('should create an action to leave the room', () => {
    const roomID = '151515';
    const expectedAction = {
      type: LEAVE_ROOM,
      roomID,
    };
    expect(leaveRoom(roomID)).toEqual(expectedAction);
  });
});
