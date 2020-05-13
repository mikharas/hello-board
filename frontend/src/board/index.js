import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import * as selectors from '../selectors/boardSelectors';
import * as boardActions from '../actions/boardActions';


const mapStateToProps = state => ({
  title: selectors.getTitle(state),
  columnOrder: selectors.getColumnOrder(state),
  uniqueId: selectors.getUniqueId(state),
});

const mapDispatchToProps = {
  ...boardActions,
};

const Board = ({
  title, columnOrder, changeTitle, addColumn,
  delColumn, swapColumns, uniqueId,
}) => {
  console.log('rendering board');
  console.log(uniqueId);
  return (
    <>
      <h1>{title}</h1>
      {columnOrder.map(columnId => <p>{columnId}</p>)}
      <Button
        onClick={() => changeTitle('hi')}
      >
        changeTitle
      </Button>
      <Button
        onClick={() => addColumn(uniqueId)}
      >
        addcolumn
      </Button>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
