import {
  createStore,
} from 'redux';
import reducers from './store/reducers';

export default createStore(
  reducers,
);
