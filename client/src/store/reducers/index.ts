import { combineReducers } from 'redux';
import rooms, {
  RoomsReducerInterface,
} from './roomReducer';
import global, {
  GlobalReducerInterface,
} from './globalReducer';

export interface AppState {
  global: GlobalReducerInterface,
  rooms: RoomsReducerInterface,
}

export default combineReducers({
  global,
  rooms,
});
