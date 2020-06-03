import * as R from 'ramda';
import data from '../reducers/monthsData';

const getNewDate = (newDate, prevDateIndex, prevWeekIndex) => {
  const firstDayIndex = newDate.getDay();
  const newDateNumber = prevWeekIndex * 7 + (prevDateIndex - firstDayIndex + 1);
  if (newDateNumber <= 0 || newDateNumber > data[newDate.getMonth()].daysCount) {
    return null;
  } return new Date(newDate.getFullYear(), newDate.getMonth(), newDateNumber);
};


export const changeMonth = newDate => (dispatch, getState) => {
  const dateIds = Object.keys(getState().dates);
  // get the new dates for each date id
  const dateIdToNewDate = R.reduceBy(
    (acc, dateId) => {
      const { dateIndex } = getState().dates[dateId];
      const { weekIndex } = getState().dates[dateId];
      return acc.concat(
        getNewDate(newDate, dateIndex, weekIndex),
      );
    }, [],
    dateId => dateId,
    dateIds,
  );

  // Now we should make a date to event ids dictionary

  // iso date string to collection of eventIds
  const events = Object.values(getState().events);
  const dateToEventIds = R.reduceBy(
    (acc, { id }) => acc.concat(id), // value fn
    [],
    ({ date }) => date.toISOString(), // key fn
    events,
  );


  console.log(dateIdToNewDate);

  const dateIdToEventIds = R.reduceBy(
    (acc, dateId) => {
      if (dateIdToNewDate[dateId][0]) {
        const dateISOString = dateIdToNewDate[dateId][0].toISOString();
        if (dateToEventIds[dateISOString]) {
          // console.log(dateISOString, dateToEventIds[dateISOString]);
          return acc.concat(dateToEventIds[dateISOString]);
        } return acc;
      } return acc;
    },
    [],
    dateId => dateId,
    dateIds,
  );

  console.log(dateIdToEventIds);


  dispatch({
    type: 'CHANGE_MONTH',
    payload: {
      newDate, dateIdToEventIds, dateIdToNewDate,
    },
  });
};

export const deletThis = () => {};
