import React, {
  useCallback, useEffect, useContext,
} from 'react';
import styled from 'styled-components';
import { StylesProvider } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import FlipMove from 'react-flip-move';
import { useMediaQuery } from 'react-responsive';
import { v4 as uuidv4 } from 'uuid';
import AuthContext from '../../shared/context/authContext';
import { useHttpClient } from '../../shared/hooks/http-hook';
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

const ColumnWrapper = styled.div`
  width: ${({ isLargeScreen }) => (isLargeScreen ? '350px' : '100%')};
`;

const titleInputStyle = {
  outline: 'none',
  border: '1px solid lightgray',
  borderRadius: '15px',
  background: 'white',
  marginTop: '13px',
  marginBottom: '15px',
  fontSize: '30px',
  fontFamily: 'inherit',
  fontWeight: 'bold',
};

const Board = ({
  title, columnOrder, changeTitle, addColumn, delColumn, selectedColumn, setSelectedColumn, swapColumns, moveTasksInColumn, moveTaskBetweenColumn, delTask, setBoardData, boardId, saveData, getData,
}) => {
  console.log('rendering board ', boardId);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    getData(boardId, token);
  }, []);

  const isLargeScreen = useMediaQuery({ minWidth: 700 });

  const flagColumnHandler = useCallback((columnId) => {
    if (!selectedColumn) {
      setSelectedColumn(columnId);
    } else if (selectedColumn === columnId) {
      setSelectedColumn(null);
    } else {
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
      moveTasksInColumn(source.droppableId, source.index, destination.index);
      return;
    }

    moveTaskBetweenColumn(source.droppableId, destination.droppableId, source.index, destination.index, draggableId);
  };
  if (!title) {
    return <h1>Is Loading..</h1>;
  }

  return (
    <StylesProvider injectFirst>
      <BoardStyled>
        <EditableTitle
          title={title}
          changeTitle={changeTitle}
          style={titleInputStyle}
        />
        <Columns>
          <DragDropContext
            onDragEnd={onDragEnd}
          >
            <FlipMove typeName={null}>
              {columnOrder.map(columnId => (
                <ColumnWrapper
                  key={`${columnId}`}
                  isLargeScreen={isLargeScreen}
                >
                  <ColumnContainer
                    key={columnId}
                    isLargeScreen={isLargeScreen}
                    columnId={columnId}
                    delColumn={delColumn}
                    flagColumnHandler={flagColumnHandler}
                  />
                </ColumnWrapper>
              ))}
            </FlipMove>
          </DragDropContext>
        </Columns>
        {columnOrder.length === 0 && (
          <Button onClick={() => addColumn(0, uuidv4())}>
            + Add column
          </Button>
        )}
        <Button onClick={() => saveData(boardId, token)}>Save Board</Button>
      </BoardStyled>
    </StylesProvider>
  );
};

export default Board;
