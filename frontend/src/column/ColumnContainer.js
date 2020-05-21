import React from 'react';
import { connect } from 'react-redux';
import Column from './Column';
import { addTask } from '../actions/columnActions';
import { addColumn } from '../actions/boardActions';


const mapStateToProps = (state, props) => {
  if (!state.columns[props.columnId]) {
    return { skipRender: true };
  }
  return {
    title: state.columns[props.columnId].title,
    taskOrder: state.columns[props.columnId].taskOrder,
    boardSelectedColumn: state.board.selectedColumn,
  };
};


const mapDispatchToProps = {
  addTask,
  addColumn,
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(Column));
