import { connect } from 'react-redux';
import Task from './Task';
import { delTask } from '../actions/columnActions';
import {
  changeTitle, changeDescription, moveTodosInTask, addTodoItem, addDate, delDate, delAllTodoItem,
} from '../actions/taskActions';
import {
  getUserBoardsData,
} from '../actions/userBoardsActions';
import { saveData } from '../actions/boardActions';
import { setSelectedTask } from '../../globalActions';

const mapStateToProps = (state, props) => {
  const task = state.tasks[props.taskId];
  return {
    title: task.title,
    description: task.description,
    date: task.date,
    completedCount: task.completedCount,
    todo: task.todo,
    completedPercentage: (task.completedCount / task.todo.length) * 100,
  };
};

const mapDispatchToProps = {
  changeTitle,
  setSelectedTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
