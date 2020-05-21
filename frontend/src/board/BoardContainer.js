import { connect } from 'react-redux';
import {
  changeTitle, delColumn, swapColumns, setSelectedColumn,
} from '../actions/boardActions';
import {
  addTask, delTask, swapTasksInColumn, moveTaskBetweenColumn,
} from '../actions/columnActions';
import Board from './Board';

const mapStateToProps = state => ({
  title: state.board.title,
  columnOrder: state.board.columnOrder,
  selectedColumn: state.board.selectedColumn,
});

const mapDispatchToProps = {
  delColumn,
  changeTitle,
  swapColumns,
  setSelectedColumn,
  swapTasksInColumn,
  moveTaskBetweenColumn,
  addTask,
  delTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
