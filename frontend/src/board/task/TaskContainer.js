import { connect } from 'react-redux';
import Task from './Task';
import { delTask } from '../actions/columnActions';
import {
  makeEvent, changeTitle, changeDescription, moveTodosInTask, addTodoItem,
} from '../actions/taskActions';


const mapStateToProps = (state, props) => ({
  title: state.tasks[props.taskId].title,
  description: state.tasks[props.taskId].description,
  completedCount: state.tasks[props.taskId].completedCount,
  todo: state.tasks[props.taskId].todo,
  eventId: state.tasks[props.taskId].eventId,
  completedPercentage: (state.tasks[props.taskId].completedCount / state.tasks[props.taskId].todo.length) * 100,
});


const mapDispatchToProps = {
  changeTitle,
  changeDescription,
  moveTodosInTask,
  addTodoItem,
  makeEvent,
  delTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
