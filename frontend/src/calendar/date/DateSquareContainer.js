import { connect } from 'react-redux';
import DateSquare from './DateSquare';

const mapStateToProps = (state, props) => ({
  date: state.dates[props.id].date,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(DateSquare);
