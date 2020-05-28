import { connect } from 'react-redux';
import {
  changeTitle, addColumn, delColumn, swapColumns, setSelectedColumn, setBoardData,
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
  setBoardData,
  delColumn,
  addColumn,
  changeTitle,
  swapColumns,
  setSelectedColumn,
  moveTasksInColumn,
  moveTaskBetweenColumn,
  addTask,
  delTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
