import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import { changeTitle, toggleIsCompleted } from '../actions/todoItemActions';
import {
  delTodoItem, incrementCompleted, decrementCompleted,
} from '../actions/taskActions';

const mapStateToProps = (state, props) => ({
  title: state.todoItems[props.todoItemId].title,
  isCompleted: state.todoItems[props.todoItemId].isCompleted,
});


const mapDispatchToProps = {
  changeTitle,
  toggleIsCompleted,
  delTodoItem,
  incrementCompleted,
  decrementCompleted,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);
