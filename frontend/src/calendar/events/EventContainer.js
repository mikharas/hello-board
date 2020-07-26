import { connect } from 'react-redux';
import { setSelectedTask } from '../../globalActions';
import Event from './Event';

const mapStateToProps = (state, props) => ({ ...state.events[props.id] });

const mapDispatchToProps = {
  setSelectedTask
};
export default connect(mapStateToProps, mapDispatchToProps)(Event);
