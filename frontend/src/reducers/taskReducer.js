const initialTasksData = {
  'task-1': {
    id: 'task-1',
    title: 'first task',
  },
  'task-2': {
    id: 'task-2',
    title: 'second task',
  },
  'task-3': {
    id: 'task-3',
    title: 'third task',
  },
};

const taskReducer = (state = initialTasksData, { type, payload }) => {
  switch (type) {
    case 'ADD_TASK':
      return {
        ...state,
        [payload.taskId]: {
          id: payload.taskId,
          title: payload.content || 'New Task',
        },
      };

    case 'DEL_TASK':
      const newState = { ...state };
      delete newState[payload.taskId];
      return newState;

    default:
      return state;
  }
};

export default taskReducer;
