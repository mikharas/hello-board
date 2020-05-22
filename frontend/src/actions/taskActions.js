export const changeTitle = (taskId, newTitle) => ({
  type: 'CHANGE_TITLE',
  payload: { taskId, newTitle },
});
