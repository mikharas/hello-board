const initialData = {
  'event-1': {
    id: 'event-1',
    date: new Date(2021, 1, 3),
    taskId: 'hello',
    type: 'A',
  },
  'event-2': {
    id: 'event-2',
    date: new Date(2021, 1, 21),
    taskId: 'hello',
    type: 'R',
  },
  'event-3': {
    id: 'event-3',
    date: new Date(2021, 1, 21),
    taskId: 'hello',
    type: 'R',
  },
};

const eventReducer = (state = initialData, { type, payload }) => {
  const newState = { ...state };
  switch (type) {
    case 'CHANGE_DATE':
      return {
        ...state,
        [payload.eventId]: {
          ...state[payload.eventId],
          date: payload.newDate,
        },
      };

    case 'ADD_EVENT':
      return {
        ...state,
        [payload.eventId]: {
          id: payload.eventId,
          date: payload.date,
          taskId: payload.taskId,
          type: payload.type,
        },
      };

    case 'DEL_EVENT':
      delete newState[payload.eventId];
      return newState;

    default:
      return state;
  }
};

export default eventReducer;
