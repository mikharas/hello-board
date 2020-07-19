const eventReducer = (state = [], { type, payload }) => {
  const newState = { ...state };
  switch (type) {
    case 'SET_EVENTS_DATA':
      return {
        ...payload.events,
      };

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
        [payload.data.eventId]: {
          id: payload.data.eventId,
          date: payload.data.date,
          taskId: payload.data.taskId,
          boardId: payload.data.boardId,
          type: payload.data.type,
        },
      };

    case 'DEL_EVENT':
      delete newState[payload.eventId];
      console.log(newState);
      return newState;

    default:
      return state;
  }
};

export default eventReducer;
