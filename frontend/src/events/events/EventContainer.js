import { connect } from 'react-redux';
import { addEvent, delEvent } from '../actions/eventActions';
import Event from './Event';

const mapStateToProps = (state, props) => ({
  id: state.events[props.eventId].id,
  date: state.events[props.eventId].date,
  taskTitle: state.tasks[state.events[props.eventId].taskId].title,
  taskDescription: state.tasks[state.events[props.eventId].taskId].description,
});

const mapDispatchToProps = {
  delEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);
