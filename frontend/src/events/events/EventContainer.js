import { connect } from 'react-redux';
import { addEvent, delEvent } from '../actions/eventActions';
import Event from './Event';

const mapStateToProps = (state, props) => ({
  date: state.events[props.id].date,
  // taskTitle: state.tasks[state.events[props.id].taskId].title,
  // taskDescription: state.tasks[state.events[props.id].taskId].description,
});

const mapDispatchToProps = {
  delEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);
