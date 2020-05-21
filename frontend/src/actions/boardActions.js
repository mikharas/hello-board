export const changeTitle = title => ({
  type: 'CHANGE_TITLE',
  payload: title,
});

export const addColumn = (columnId, insertAfter) => ({
  type: 'ADD_COLUMN',
  payload: { columnId, insertAfter },
});

export const delColumn = columnId => ({
  type: 'DEL_COLUMN',
  payload: columnId,
});

export const swapColumns = (col_1, col_2) => ({
  type: 'SWAP_COLUMNS',
  payload: { col_1, col_2 },
});

export const setSelectedColumn = columnId => ({
  type: 'SET_SELECTED_COLUMN',
  payload: columnId,
});
