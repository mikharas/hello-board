import { connect } from 'react-redux';
import { changeMonth } from '../actions/calendarActions';
import Calendar from './Calendar';

const mapStateToProps = state => ({
  monthName: state.calendar.monthName,
  dates: state.calendar.dates,
  dueDates: state.calendar.dueDates,
});

const mapDispatchToProps = {
  changeMonth,
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
