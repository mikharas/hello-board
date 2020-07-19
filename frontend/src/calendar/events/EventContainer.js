import { connect } from 'react-redux';
import { addEvent, delEvent } from '../../events/actions/eventActions';
import Event from './Event';

const mapStateToProps = (state, props) => ({ ...state.events[props.id] });

const mapDispatchToProps = {
  delEvent,
};
export default connect(mapStateToProps, mapDispatchToProps)(Event);
