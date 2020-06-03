import { connect } from 'react-redux';
import DateSquare from './DateSquare';

const mapStateToProps = (state, props) => ({
  date: state.dates[props.id].date,
  eventIds: state.dates[props.id].eventIds,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(DateSquare);
