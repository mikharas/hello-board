import { connect } from 'react-redux';
import Task from './Task';
import { addTask, delTask } from '../actions/columnActions';
import { changeTitle } from '../actions/taskActions';

const mapStateToProps = (state, props) => ({
  title: state.tasks[props.taskId].title,
  todo: state.tasks[props.taskId].todo,
});


const mapDispatchToProps = {
  changeTitle,
  addTask,
  delTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
