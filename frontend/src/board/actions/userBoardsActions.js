const axios = require('axios');


export const setUserBoardsData = data => ({
  type: 'SET_USER_BOARDS_DATA',
  payload: data,
});

export const addBoard = (title, id) => ({
  type: 'ADD_BOARD',
  payload: { title, id },
});

export const delBoard = id => ({
  type: 'DEL_BOARD',
  payload: { id },
});

export const getUserBoardsData = (userId, token) => (dispatch) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer: ${token}`,
  };

  axios.get(
    `http://localhost:3000/api/boards/user/${userId}`,
    { headers },
  ).then((response) => {
    dispatch(setUserBoardsData(response.data.boards));
  });
};

export const postUserBoard = (userId, token) => (dispatch) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer: ${token}`,
  };

  axios.post(
    'http://localhost:3000/api/boards/',
    JSON.stringify({
      creator: userId,
      title: 'New Board',
    }),
    { headers },
  ).then((response) => {
    dispatch(addBoard(response.data.board.title, response.data.board.id));
  });
};

export const delUserBoard = (boardId, token) => (dispatch) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer: ${token}`,
  };

  axios.delete(
    `http://localhost:3000/api/boards/${boardId}`,
    { headers },
  ).then(() => {
    dispatch(delBoard(boardId));
  });
};
