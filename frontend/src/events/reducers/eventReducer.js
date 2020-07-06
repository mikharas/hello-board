const initialData = {
  'event-1': {
    id: 'event-1',
    date: new Date(2021, 1, 3),
    taskId: "56052716-b894-4a7f-a6f7-dce70df9b816",
    boardId: "5ee79be06eaef607d2d92fca",
    type: 'T',
  },
  'event-2': {
    id: 'event-2',
    date: new Date(2021, 1, 21),
    taskId: null,
    boardId: null,
    type: 'A',
  },
  'event-3': {
    id: 'event-3',
    date: new Date(2021, 1, 21),
    taskId: "9ddeb7b8-d11f-4b75-96bd-51117e23b0ad",
    boardId: "5ee31dd4726e3c461dee78ac",
    type: 'T',
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
          boardId: payload.boardId,
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
