const initialTodoItemData = {
  'todo-1': {
    id: 'todo-1',
    title: 'first todo',
    isCompleted: false,
  },
  'todo-2': {
    id: 'todo-2',
    title: 'second todo',
    isCompleted: false,
  },
  'todo-3': {
    id: 'todo-3',
    title: 'third todo',
    isCompleted: false,
  },
};

const todoItemReducer = (state = initialTodoItemData, { type, payload }) => {
  switch (type) {
    case 'CHANGE_TODO_ITEM_TITLE':
      const newState =  {
        ...state,
        [payload.todoItemId]: {
          ...state[payload.todoItemId],
          title: payload.newTitle,
        },
      };
      return newState;

    case 'ADD_TODO_ITEM':
      return {
        ...state,
        [payload.todoItemId]: {
          id: payload.todoItemId,
          title: payload.title || 'New todo item',
          isCompleted: false,
        },
      }

    case 'DEL_TODO_ITEM':
      newState = { ...state };
      delete newState[payload.todoItemId];
      return newState;

    default:
      return state;
  }
};

export default todoItemReducer;
