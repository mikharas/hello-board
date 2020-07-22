// import * as R from 'ramda';
//
// const axios = require('axios');
//
// export const setUserEventsData = data => ({
  // type: 'SET_USER_EVENTS_DATA',
  // payload: data,
// });
//
// export const getUserEventsData = (userId, token) => (dispatch) => {
  // const headers = {
    // 'Content-Type': 'application/json',
    // Authorization: `Bearer: ${token}`,
  // };
//
  // axios.get(
    // `http://localhost:3000/api/events/user/${userId}`,
    // { headers },
  // ).then((response) => {
    // const idToEvent = R.groupBy(
      // eventData => eventData.id,
      // response.data.events,
    // );
    // Object.keys(idToEvent).forEach((id) => {
      // idToEvent[id] = idToEvent[id][0];
    // });
    // dispatch(setUserEventsData(idToEvent));
  // });
// };
//
// export const changeDate = (eventId, newDate) => ({
  // type: 'CHANGE_DATE',
  // payload: { eventId, newDate },
// });
//
// export const addEvent = data => ({
  // type: 'ADD_EVENT',
  // payload: data,
// });
//
// export const delEvent = eventId => ({
  // type: 'DEL_EVENT',
  // payload: { eventId },
// });
//
// export const postUserEvent = (userId, token, date, taskId, boardId, type) => (dispatch) => {
  // const headers = {
    // 'Content-Type': 'application/json',
    // Authorization: `Bearer: ${token}`,
  // };
//
  // axios.post(
    // 'http://localhost:3000/api/events/',
    // JSON.stringify({
      // creator: userId,
      // date,
      // taskId,
      // boardId,
      // type,
    // }),
    // { headers },
  // ).then((response) => {
    // console.log(response.data.event);
    // dispatch(addEvent(response.data.event));
  // });
// };
//
// export const delUserEvent = (eventId, token) => (dispatch) => {
  // const headers = {
    // 'Content-Type': 'application/json',
    // Authorization: `Bearer: ${token}`,
  // };
//
  // axios.delete(
    // `http://localhost:3000/api/events/${eventId}`,
    // { headers },
  // ).then(() => {
    // dispatch(delEvent(eventId));
  // });
// };
