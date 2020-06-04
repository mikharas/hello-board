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

const dateReducer = (state = initialData, { type, payload }) => {
  let newState = {};
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

    case 'ADD_EVENT':
      return {
        ...state,
        [payload.dateId]: {
          ...state[payload.dateId],
          eventIds: [
            ...state[payload.dateId].eventIds,
            payload.eventId,
          ],
        },
      };

    case 'DEL_EVENT':
      return {
        ...state,
        [payload.dateId]: {
          ...state[payload.dateId],
          eventIds: state[payload.dateId].filter(eventId => eventId !== payload.eventId),
        },
      };


    case 'MOVE_EVENT_BETWEEN_DATE':
      const newEventIds1 = [...state[payload.dateId1].eventIds];
      const newEventIds2 = [...state[payload.dateId2].eventIds];

      console.log(newEventIds1);
      console.log(newEventIds2);
      newEventIds1.splice(payload.index1, 1);
      newEventIds2.splice(payload.index2, 0, payload.eventId);
      console.log(newEventIds1);
      console.log(newEventIds2);

      newState = {
        ...state,
        [payload.dateId1]: {
          ...state[payload.dateId1],
          eventIds: newEventIds1,
        },
        [payload.dateId2]: {
          ...state[payload.dateId2],
          eventIds: newEventIds2,
        },
      };
      console.log(newState);
      return newState;

    default:
      return state;
  }
};

export default dateReducer;
