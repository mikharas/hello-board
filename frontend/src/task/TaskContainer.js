import { connect } from 'react-redux';
import Task from './Task';
import { delTask } from '../actions/columnActions';
import { changeTitle, moveTodosInTask, addTodoItem } from '../actions/taskActions';

const mapStateToProps = (state, props) => ({
  title: state.tasks[props.taskId].title,
  description: state.tasks[props.taskId].description,
  todo: state.tasks[props.taskId].todo,
});


const mapDispatchToProps = {
  changeTitle,
  moveTodosInTask,
  addTodoItem,
  delTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
