const initialTasksData = {
  'task-1': {
    id: 'task-1',
    title: 'first task',
    description: 'Do this and do that',
    todo: ['todo-1', 'todo-2', 'todo-3'],
    completed: null,
  },
  'task-2': {
    id: 'task-2',
    title: 'second task',
    description: 'Do this and do that',
    todo: [],
    completed: null,
  },
  'task-3': {
    id: 'task-3',
    title: 'third task',
    description: 'Do this and do that',
    todo: [],
    completed: null,
  },
};

const taskReducer = (state = initialTasksData, { type, payload }) => {
  switch (type) {
    case 'CHANGE_TITLE':
      return {
        ...state,
        [payload.taskId]: {
          title: payload.newTitle,
        },
      };

    case 'ADD_TASK':
      return {
        ...state,
        [payload.taskId]: {
          id: payload.taskId,
          title: payload.content || 'New Task',
          description: '',
          todo: [],
          completed: 0,
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
