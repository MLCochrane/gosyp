import { combineReducers } from 'redux';
import navigation from './navReducer';
import projects from './projectReducer';
import homepage from './homeReducer';
import about from './aboutReducer';
import blog from './blogReducer';
import contact from './contactReducer';
import history from './historyReducer';
import styles from './stylesReducer';
import expertise from './expertiseReducer';

export default combineReducers({
  contact,
  blog,
  about,
  navigation,
  projects,
  homepage,
  history,
  styles,
  expertise,
});
