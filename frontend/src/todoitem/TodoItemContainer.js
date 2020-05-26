import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import { changeTitle } from '../actions/todoItemActions';
import { addTodoItem, delTodoItem } from '../actions/taskActions';

const mapStateToProps = (state, props) => ({
  title: state.todoItems[props.todoItemId].title,
  isCompleted: state.todoItems[props.todoItemId].isCompleted,
});


const mapDispatchToProps = {
  changeTitle,
  addTodoItem,
  delTodoItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
