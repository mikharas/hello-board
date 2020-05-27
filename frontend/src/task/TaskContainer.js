import { connect } from 'react-redux';
import Task from './Task';
import { delTask } from '../actions/columnActions';
import {
  changeTitle, changeDescription, moveTodosInTask, addTodoItem,
} from '../actions/taskActions';


const mapStateToProps = (state, props) => {
  console.log(state, props)
  return {
    title: state.tasks[props.taskId].title,
    description: state.tasks[props.taskId].description,
    completedCount: state.tasks[props.taskId].completedCount,
    todo: state.tasks[props.taskId].todo,
    completedPercentage: (state.tasks[props.taskId].completedCount / state.tasks[props.taskId].todo.length) * 100,
  } };


const mapDispatchToProps = {
  changeTitle,
  changeDescription,
  moveTodosInTask,
  addTodoItem,
  delTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
