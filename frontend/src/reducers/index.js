import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import columnReducer from './columnReducer';
import taskReducer from './taskReducer';

export default combineReducers({
  board: boardReducer,
  columns: columnReducer,
  tasks: taskReducer,
});
