import { connect } from 'react-redux';
import { addEvent, delEvent } from '../../events/actions/eventActions';
import Event from './Event';

const mapStateToProps = (state, props) => {
  const {
    date, taskId, boardId, type,
  } = state.events[props.id];

  return {
    date,
    task: taskId && state.userBoards[boardId].tasks[taskId],
    type,
  };
};

const mapDispatchToProps = {
  delEvent,
};
export default connect(mapStateToProps, mapDispatchToProps)(Event);
