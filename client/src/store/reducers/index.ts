import { combineReducers } from 'redux';
import rooms from './roomReducer';
import global from './globalReducer';

export default combineReducers({
  global,
  rooms,
});
