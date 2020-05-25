import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import { addTask, delTask } from '../actions/columnActions';

const mapStateToProps = (state, props) => ({
  title: state.todoItems[props.todoItemId].title,
  isCompleted: state.todoItems[props.todoItemId].isCompleted,

});


const mapDispatchToProps = {
  addTodoItem,
  delTodoItem,
  swapTodoItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
