const initialData = {
  'event-1': {
    id: 'event-1',
    date: new Date(2021, 1, 3),
    taskId: 'hello',
    type: 'todo',
  },
  'event-2': {
    id: 'event-2',
    date: new Date(2021, 1, 21),
    taskId: 'hello',
    type: 'todo',
  }
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
          type: payload.type,
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
