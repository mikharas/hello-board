import { connect } from 'react-redux';
import { changeMonth } from '../actions/calendarActions';
import Calendar from './Calendar';
import { addEvent, delEvent, moveEventBetweenDates } from '../actions/dateActions';

const mapStateToProps = state => ({
  monthName: state.calendar.monthName,
  yearName: state.calendar.yearName,
  dates: state.calendar.dates,
  boardIds: Object.keys(state.userBoards)
});

const mapDispatchToProps = {
  changeMonth,
  addEvent,
  delEvent,
  moveEventBetweenDates,
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
