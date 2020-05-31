import { connect } from 'react-redux';
import {
  changeTitle, addColumn, delColumn, swapColumns, setSelectedColumn, saveData, getData, resetBoardData,
} from '../actions/boardActions';
import {
  addTask, delTask, moveTasksInColumn, moveTaskBetweenColumn,
} from '../actions/columnActions';
import Board from './Board';

const mapStateToProps = state => ({
  title: state.board.title,
  columnOrder: state.board.columnOrder,
  selectedColumn: state.board.selectedColumn,
});

const mapDispatchToProps = {
  delColumn,
  addColumn,
  changeTitle,
  swapColumns,
  setSelectedColumn,
  moveTasksInColumn,
  moveTaskBetweenColumn,
  addTask,
  delTask,
  saveData,
  getData,
  resetBoardData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
