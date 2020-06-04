export const addEvent = (dateId, eventId, taskId, date, type) => ({
  type: 'ADD_EVENT',
  payload: {
    eventId, taskId, date, type,
  },
});

export const delEvent = (dateId, eventId) => ({
  type: 'DEL_EVENT',
  payload: { dateId, eventId },
});

export const moveEventBetweenDates = (dateId1, dateId2, index1, index2, eventId) => ({
  type: 'MOVE_EVENT_BETWEEN_DATE',
  payload: {
    dateId1, dateId2, index1, index2, eventId,
  },
});
