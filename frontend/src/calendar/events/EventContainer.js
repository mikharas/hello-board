import { connect } from 'react-redux';
import { addEvent, delEvent } from '../../events/actions/eventActions';
import { setSelectedTask } from '../../globalActions';
import Event from './Event';

const mapStateToProps = (state, props) => ({ ...state.events[props.id] });

const mapDispatchToProps = {
  delEvent,
  setSelectedTask
};
export default connect(mapStateToProps, mapDispatchToProps)(Event);
