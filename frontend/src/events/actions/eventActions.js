export const addEvent = (eventId, taskId, date) => ({
  type: 'ADD_EVENT',
  payload: { eventId, taskId, date },
});

export const delEvent = (eventId) => ({
  type: 'DEL_EVENT',
  payload: eventId,
})
