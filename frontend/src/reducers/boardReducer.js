const initialBoardData = {
  selectedColumn: null,
  title: 'sarah',
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

const boardReducer = (state = initialBoardData, { type, payload }) => {
  switch (type) {
    case 'CHANGE_TITLE':
      return {
        ...state,
        title: payload,
      };
    case 'ADD_COLUMN':
      return {
        ...state,
        columnOrder: [...state.columnOrder, payload],
      };
    case 'DEL_COLUMN':
      const newState = {
        ...state,
        columnOrder: state.columnOrder.filter(columnId => payload !== columnId),
      };
      return newState;

    case 'SWAP_COLUMNS':
      const col_1_index = state.columnOrder.indexOf(payload.col_1);
      const col_2_index = state.columnOrder.indexOf(payload.col_2);
      const newColumnOrder = [...state.columnOrder];
      const save = newColumnOrder[col_1_index];
      newColumnOrder[col_1_index] = newColumnOrder[col_2_index];
      newColumnOrder[col_2_index] = save;
      console.log('new columnorder ', newColumnOrder);
      return {
        ...state,
        columnOrder: newColumnOrder,
      };

    case 'SET_SELECTED_COLUMN':
      console.log('sldkfjsldkfjlsdkj');
      return {
        ...state,
        selectedColumn: payload,
      };

    default:
      return state;
  }
};

export default boardReducer;
