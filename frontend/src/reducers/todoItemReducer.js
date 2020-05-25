const initialTodoItemData = {
  'todo-1': {
    id: 'todo-1',
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
    case 'ADD_TODO_ITEM':
      return {
        ...state,
        [payload.todoItemId]: {
          id: payload.todoItemId,
        },

      }

    default:
      return state;
  }
};

export default todoItemReducer;
