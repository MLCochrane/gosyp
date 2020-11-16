import reducer from './roomReducer';
import { SET_CURRENT_ROOM, RECEIVE_ROOM_ID } from '../constants';

const defaultState = {
  rooms: {},
  currentRoom: '',
};

describe('Room Reducer', () => {
  it('should handle RECEIVE_ROOM_ID', () => {
    // adding new
    expect(
      reducer(defaultState, {
        type: RECEIVE_ROOM_ID,
        roomID: '41414'
      })
    ).toEqual(
      {
        rooms: {
          '41414': '41414'
        },
        currentRoom: '',
      }
    );

    // appending to existing
    expect(
      reducer({
        rooms: {
          '125': '125',
        },
        currentRoom: '515',
      }, {
        type: RECEIVE_ROOM_ID,
        roomID: '8585'
      })
    ).toEqual(
      {
        rooms: {
          '125': '125',
          '8585': '8585'
        },
        currentRoom: '515',
      }
    );
  });

  it('should handle SET_CURRENT_ROOM', () => {
    expect(
      reducer(defaultState, {
        type: SET_CURRENT_ROOM,
        roomID: '41414'
      })
    ).toEqual(
      {
        rooms: {},
        currentRoom: '41414',
      }
    );

    expect(
      reducer({
        rooms: {
          '125': '125',
          '515': '515',
        },
        currentRoom: '515',
      }, {
        type: SET_CURRENT_ROOM,
        roomID: '125'
      })
    ).toEqual(
      {
        rooms: {
          '125': '125',
          '515': '515',
        },
        currentRoom: '125',
      }
    );
  });
});
