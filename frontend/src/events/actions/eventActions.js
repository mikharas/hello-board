export const addEvent = (eventId, taskId, date, type) => ({
  type: 'ADD_EVENT',
  payload: {
    eventId, taskId, date, type,
  },
});

export const delEvent = eventId => ({
  type: 'DEL_EVENT',
  payload: eventId,
});
