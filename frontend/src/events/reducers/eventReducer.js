const initialData = {
  'event-1': {
    id: 'event-1',
    date: new Date(2021, 1, 3),
    taskId: "a10e55de-91a2-4845-b027-97023efc4d56",
    boardId: "5ed23971f9552b7c029e3885",
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
    taskId: "3898bf9c-f982-4e66-9581-aa93c7243dce",
    boardId: "5ed23971f9552b7c029e3885",
    type: 'T',
  },
  'event-4': {
    id: 'event-4',
    date: new Date(2021, 1, 22),
    taskId: "cebfb2fe-60ff-46bc-a751-f41c7a81568a",
    boardId: "5ed23f9f96270bf35856a83e",
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
