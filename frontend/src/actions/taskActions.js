export const changeTitle = (taskId, newTitle) => ({
  type: 'CHANGE_TASK_TITLE',
  payload: { taskId, newTitle },
});
