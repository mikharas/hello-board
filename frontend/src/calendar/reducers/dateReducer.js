import data from './monthsData';

const initialData = {};

const getNewDate = (newDate, prevDateIndex, prevWeekIndex) => {
  const firstDayIndex = newDate.getDay();
  const newDateNumber = prevWeekIndex * 7 + (prevDateIndex - firstDayIndex + 1);
  if (newDateNumber <= 0 || newDateNumber > data[newDate.getMonth()].daysCount) {
    return null;
  } return new Date(newDate.getFullYear(), newDate.getMonth(), newDateNumber);
};

for (let i = 0, len = 42; i < len; i += 1) {
  initialData[`date-${i}`] = {
    id: `date-${i}`,
    date: getNewDate(new Date(), i % 7, Math.floor(i / 7)),
    weekIndex: Math.floor(i / 7),
    dateIndex: i % 7,
    eventIds: [],
  };
}

// const getNewDateNumber = (prevDateNumber, prevDateIndex, totalDays) => {
// const newIndex = (totalDays % 7) + prevDateIndex;
// return prevDateNumber - (newIndex - prevDateIndex);
// };

const dateReducer = (state = initialData, { type, payload }) => {
  const newState = {};
  switch (type) {
    case 'CHANGE_MONTH':
      for (let i = 0; i < 42; i += 1) {
        newState[`date-${i}`] = {
          ...state[`date-${i}`],
          eventIds: payload.dateIdToEventIds[`date-${i}`],
          date: payload.dateIdToNewDate[`date-${i}`][0],
        };
      }
      return newState;

    case 'SET_DATE_DATA':
      return {
        ...state,
        [payload.dateId]: {
          ...state[payload.dateId],
          dateNumber: payload.dateNumber,
          eventIds: payload.eventIds,
        },
      };

    case 'SET_DUE_ITEM':
      return {
        ...state,
        [payload.dateId]: {
          ...state[payload.dateId],
          eventIds: payload.eventIds,
        }
      }

    default:
      return state;
  }
};

export default dateReducer;
