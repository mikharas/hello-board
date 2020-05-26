export const changeTitle = (taskId, newTitle) => ({
  type: 'CHANGE_TASK_TITLE',
  payload: { taskId, newTitle },
});

export const addTodoItem = (taskId, todoItemId, title = null) => ({
  type: 'ADD_TODO_ITEM',
  payload: { taskId, todoItemId, title },
});

export const delTodoItem = (taskId, todoItemId) => ({
  type: 'DEL_TODO_ITEM',
  payload: { taskId, todoItemId },
});

export const moveTodosInTask = (taskId, index1, index2) => ({
  type: 'MOVE_TODOS_IN_TASK',
  payload: { taskId, index1, index2 },
});
