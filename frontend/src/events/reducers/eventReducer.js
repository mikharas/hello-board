const initialData = {
  'event-1': {
    id: 'event-1',
    date: new Date(2020, 6, 23),
    taskId: 'a10e55de-91a2-4845-b027-97023efc4d56',
  },
  'event-2': {
    id: 'event-2',
    date: new Date(2020, 7, 4),
    taskId: '3898bf9c-f982-4e66-9581-aa93c7243dce',
  },
};

const eventReducer = (state = initialData, { type, payload }) => {
  const newState = { ...state };
  switch (type) {
    case 'ADD_EVENT':
      return {
        ...state,
        [payload.eventId]: {
          id: payload.eventId,
          date: payload.date,
          taskId: payload.taskId,
        },
      };

    case 'DEL_EVENT':
      delete newState[payload];
      return newState;

    default:
      return state;
  }
};

export default eventReducer;
