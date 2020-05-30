import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import columnReducer from './columnReducer';
import taskReducer from './taskReducer';
import todoItemReducer from './todoItemReducer';
import userBoardsReducer from './userBoardsReducer';

export default combineReducers({
  board: boardReducer,
  columns: columnReducer,
  tasks: taskReducer,
  todoItems: todoItemReducer,
  userBoards: userBoardsReducer,
});
