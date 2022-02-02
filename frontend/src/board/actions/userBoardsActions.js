import * as R from 'ramda';
import authHeader from '../../services/authHeader';

const axios = require('axios');
const api = 'http://localhost:3000/api'

export const setUserBoardsData = data => ({
  type: 'SET_USER_BOARDS_DATA',
  payload: data,
});

export const addBoard = boardData => ({
  type: 'ADD_BOARD',
  payload: boardData,
});

export const delBoard = id => ({
  type: 'DEL_BOARD',
  payload: { id },
});

export const getUserBoardsData = (userId) => async (dispatch) => {
  dispatch({
    type: 'SET_LOADING',
    payload: true,
  });
  await axios.get(
    `${api}/boards/user/${userId}`,
    { headers: authHeader() },
  ).then((response) => {
    const idToBoard = R.groupBy(
      boardData => boardData.id,
      response.data.boards,
    );
    Object.keys(idToBoard).forEach((id) => {
      idToBoard[id] = idToBoard[id][0];
    });
    dispatch(setUserBoardsData(idToBoard));
    dispatch({
      type: 'SET_LOADING',
      payload: false,
    });
  });
};

export const postUserBoard = (userId) => (dispatch) => {
  axios.post(
    `${api}/boards/`,
    JSON.stringify({
      creator: userId,
      title: 'New Board',
    }),
    { headers: authHeader() },
  ).then((response) => {
    dispatch(addBoard(response.data.board));
  });
};

export const delUserBoard = (boardId, token) => (dispatch) => {
  axios.delete(
    `${api}/boards/${boardId}`,
    { headers: authHeader() },
  ).then(() => {
    dispatch(delBoard(boardId));
  });
};
