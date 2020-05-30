const userBoardsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case 'SET_USER_BOARDS_DATA':
      return payload;

    case 'ADD_BOARD':
      return [...state, {
        id: payload.id,
        title: payload.title,
      }];

    case 'DEL_BOARD':
      return state.filter(board => board.id !== payload.id);

    default:
      return state;
  }
};

export default userBoardsReducer;
