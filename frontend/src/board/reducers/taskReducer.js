const initialTasksData = {
  'task-1': {
    id: 'task-1',
    eventId: null,
    title: 'first task',
    description: 'Do this and do that',
    todo: ['todo-1', 'todo-2', 'todo-3'],
    completedCount: 0,
  },
  'task-2': {
    id: 'task-2',
    eventId: null,
    title: 'second task',
    description: 'Do this and do that',
    todo: [],
    completedCount: 0,
  },
  'task-3': {
    id: 'task-3',
    eventId: null,
    title: 'third task',
    description: 'Do this and do that',
    todo: [],
    completedCount: 0,
  },
};

const taskReducer = (state = initialTasksData, { type, payload }) => {
  let newState;
  switch (type) {
    case 'SET_BOARD_DATA':
      return {
        ...payload.tasks,
      };

    case 'CHANGE_TASK_TITLE':
      newState = {
        ...state,
        [payload.taskId]: {
          ...state[payload.taskId],
          title: payload.newTitle,
        },
      };
      return newState;

    case 'CHANGE_TASK_DESCRIPTION':
      newState = {
        ...state,
        [payload.taskId]: {
          ...state[payload.taskId],
          description: payload.newDescription,
        },
      };
      return newState;

    case 'INCREMENT_COMPLETED_COUNT':
      return {
        ...state,
        [payload.taskId]: {
          ...state[payload.taskId],
          completedCount: state[payload.taskId].completedCount + 1,
        },
      };

    case 'ADD_EVENT':
      return {
        ...state,
        [payload.taskId]: {
          ...state[payload.taskId],
          eventId: payload.eventId,
        },
      };

    case 'DECREMENT_COMPLETED_COUNT':
      return {
        ...state,
        [payload.taskId]: {
          ...state[payload.taskId],
          completedCount: state[payload.taskId].completedCount - 1,
        },
      };

    case 'ADD_TASK':
      return {
        ...state,
        [payload.taskId]: {
          id: payload.taskId,
          boardId: payload.boardId,
          title: payload.content || 'New Task',
          description: '',
          todo: [],
          completedCount: 0,
        },
      };

    case 'DEL_TASK':
      newState = { ...state };
      delete newState[payload.taskId];
      return newState;

    case 'MOVE_TODOS_IN_TASK':
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
