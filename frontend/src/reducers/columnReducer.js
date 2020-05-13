const initialColumnsData = {
  'column-1': {
    id: 'column-1',
    title: 'first column',
    taskOrder: ['task-1', 'task-2'],
  },
  'column-2': {
    id: 'column-2',
    title: 'second column',
    taskOrder: ['task-3'],
  },
  'column-3': {
    id: 'column-3',
    title: 'third column',
    taskOrder: [],
  },
};

const columnReducer = (state = initialColumnsData, { type, payload }) => {
  switch (type) {
    case 'CHANGE_TITLE':
      return {
        ...state,
        [payload.columnId]: {
          ...state[payload.columnId],
          title: payload,
        },
      };

    case 'ADD_TASK':
      return {
        ...state,
        [payload.columnId]: {
          ...state[payload.columnId],
          taskOrder: [...state[payload.columnId].taskOrder, payload.taskId],
        },
      };

    case 'DEL_TASK':
      return {
        ...state,
        [payload.columnId]: {
          ...state[payload.columnId],
          taskOrder: state[payload.columnId].taskOrder.filter(taskId => (
            payload.taskId !== taskId
          )),
        },
      };

    default:
      return state;
  }
};

export default columnReducer;
