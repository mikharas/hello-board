import { connect } from 'react-redux';
import Task from './Task';
import { addTask, delTask } from '../actions/columnActions';

const mapStateToProps = (state, props) => ({
  title: state.tasks[props.taskId].title,
});


const mapDispatchToProps = {
  addTask,
  delTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
