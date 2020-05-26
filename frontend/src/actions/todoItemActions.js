export const changeTitle = (todoItemId, newTitle) => ({
  type: 'CHANGE_TODO_ITEM_TITLE',
  payload: { todoItemId, newTitle },
})
