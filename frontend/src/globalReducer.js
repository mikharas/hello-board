const globalReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'SET_SELECTED_TASK':
      return {
        ...state,
        selectedTask: payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: payload,
      };

    default:
      return state;
  }
};

export default globalReducer;
