export const changeTitle = title => ({
  type: 'CHANGE_TITLE',
  payload: title,
});

export const addColumn = columnId => ({
  type: 'ADD_COLUMN',
  payload: columnId,
});

export const delColumn = columnId => ({
  type: 'DEL_COLUMN',
  payload: columnId,
});

export const swapColumns = (col_1, col_2) => ({
  type: 'SWAP_COLUMNS',
  payload: { col_1, col_2 },
});
