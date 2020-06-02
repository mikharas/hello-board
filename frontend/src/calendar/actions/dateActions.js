export const getEvent = () => (dispatch, getState) {
  const eventIds = getState.events.keys();
  const dateToEventId = {}
  eventIds.forEach((eventId) => {
    eventIdToDate[getState.events[eventId].date] = getState.events[eventId].date;
  })
}
