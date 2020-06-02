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
    dateId: `date-${i}`,
    date: getNewDate(new Date(), i % 7, Math.floor(i / 7)),
    weekIndex: Math.floor(i / 7),
    dateIndex: i % 7,
    dueItem: null,
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
          dueItem: null,
          date: getNewDate(payload, state[`date-${i}`].dateIndex,
            state[`date-${i}`].weekIndex),
        };
      }
      return newState;

    case 'SET_DATE_DATA':
      return {
        ...state,
        [payload.dateId]: {
          ...state[payload.dateId],
          dateNumber: payload.dateNumber,
          dueItem: payload.dueItem,
        },
      };

    case 'SET_DUE_ITEM':
      return {
        ...state,
        [payload.dateId]: {
          ...state[payload.dateId],
          dueItem: payload.dueItemId
        }
      }

    default:
      return state;
  }
};

export default dateReducer;
