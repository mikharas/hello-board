import React, { useCallback } from 'react';
import styled from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import FlipMove from 'react-flip-move';
import { useMediaQuery } from 'react-responsive';
import { v4 as uuidv4 } from 'uuid';
import ColumnContainer from '../column/ColumnContainer';
import EditableTitle from '../subcomponents/editableTitle';

const Columns = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
`;

const BoardStyled = styled.div`
  margin: 35px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Board = ({
  title, columnOrder, changeTitle, delColumn, selectedColumn, setSelectedColumn, swapColumns, swapTasksInColumn, moveTaskBetweenColumn, delTask,
}) => {
  console.log('rendering board');

  const isLargeScreen = useMediaQuery({ minWidth: 800 });

  const flagColumnHandler = useCallback((columnId) => {
    console.log('flagging column', columnId);
    if (!selectedColumn) {
      console.log('setting column');
      setSelectedColumn(columnId);
    } else if (selectedColumn === columnId) {
      console.log('undoing column');
      setSelectedColumn(null);
    } else {
      console.log('switching columns ', selectedColumn, ' and ', columnId);
      swapColumns(selectedColumn, columnId);
      setSelectedColumn(null);
    }
  }, [selectedColumn]);

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId
      && destination.index === source.index
    ) return;

    if (source.droppableId === destination.droppableId) {
      swapTasksInColumn(source.droppableId, source.index, destination.index);
      return;
    }

    moveTaskBetweenColumn(source.droppableId, destination.droppableId, source.index, destination.index, draggableId);
  };

  return (
    <StylesProvider injectFirst>
      <BoardStyled>
        <EditableTitle
          title={title}
          changeTitle={changeTitle}
        />
        <Columns>
          <DragDropContext
            onDragEnd={onDragEnd}
          >
            <FlipMove typeName={null}>
              {columnOrder.map(columnId => (
                <div key={`${columnId}`}>
                  <ColumnContainer
                    key={columnId}
                    isLargeScreen={isLargeScreen}
                    columnId={columnId}
                    delColumn={delColumn}
                    flagColumnHandler={flagColumnHandler}
                  />
                </div>
              ))}
            </FlipMove>
          </DragDropContext>
        </Columns>
        <Button
          onClick={() => changeTitle('hi')}
        >
          changeTitle
        </Button>
      </BoardStyled>
    </StylesProvider>
  );
};

export default Board;
