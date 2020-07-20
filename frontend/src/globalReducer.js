const globalReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'SET_SELECTED_TASK':
      console.log(payload);
      return {
        ...state,
        selectedTask: payload,
      };

    default:
      return state;
  }
};

export default globalReducer;
