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
    case 'CHANGE_TASK_TITLE':
      const newState = {
        ...state,
        [payload.taskId]: {
          ...state[payload.taskId],
          title: payload.newTitle,
        },
      };
      return newState;

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
      newState = { ...state };
      delete newState[payload.taskId];
      return newState;

    case 'MOVE_TODOS_IN_TASK':
      console.log(payload);
      const newTodo = [...state[payload.taskId].todo];

      const save = newTodo[payload.index1];
      newTodo.splice(payload.index1, 1);
      newTodo.splice(payload.index2, 0, save);

      return {
        ...state,
        [payload.taskId]: {
          ...state[payload.taskId],
          todo: newTodo,
        },
      };

    case 'ADD_TODO_ITEM':
      return {
        ...state,
        [payload.taskId]: {
          ...state[payload.taskId],
          todo: [
            ...state[payload.taskId].todo,
            payload.todoItemId,
          ],
        },
      };

    case 'DEL_TODO_ITEM':
      return {
        ...state,
        [payload.taskId]: {
          ...state[payload.taskId],
          todo: state[payload.taskId].todo.filter(todoItemId => (
            payload.todoItemId !== todoItemId
          )),
        },
      };

    default:
      return state;
  }
};

export default taskReducer;
