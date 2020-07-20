import { connect } from 'react-redux';
import { changeMonth, getEvents } from '../actions/calendarActions';
import Calendar from './Calendar';
import { moveEventBetweenDates } from '../actions/dateActions';

const mapStateToProps = state => ({
  monthName: state.calendar.monthName,
  yearName: state.calendar.yearName,
  dates: state.calendar.dates,
  boardIds: Object.keys(state.userBoards),
  userBoards: state.userBoards,
});

const mapDispatchToProps = {
  changeMonth,
  getEvents,
  moveEventBetweenDates,
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
