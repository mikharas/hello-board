import React, {
  useCallback, useEffect, useContext, useState,
} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import FlipMove from 'react-flip-move';
import { useMediaQuery } from 'react-responsive';
import { v4 as uuidv4 } from 'uuid';
import TimeoutContext from '../../shared/context/timeoutContext';
import AuthContext from '../../shared/context/authContext';
import ColumnContainer from '../column/ColumnContainer';
import TaskModal from '../taskModal/TaskModalContainer';
import EditableTitle from '../subcomponents/editableTitle';
import WarningDialog from '../../shared/components/WarningDialog';
import LoadingOverlay from '../../shared/components/LoadingOverlay';

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

const ButtonStyled = styled(Button)`
  font-size: 20px;
  color: red;
`;

const BackButton = styled(ButtonStyled)`
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 20px;
  color: red;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ColumnWrapper = styled.div`
  width: ${({ isLargeScreen }) => (isLargeScreen ? '350px' : '100%')};
`;

const titleInputStyle = {
  outline: 'none',
  border: '1px solid lightgray',
  borderRadius: '10px',
  background: 'white',
  marginTop: '13px',
  marginBottom: '15px',
  width: '100%',
  fontSize: '30px',
  fontFamily: 'inherit',
  fontWeight: 'bold',
};

const Board = ({
  title, columnOrder, changeTitle, addColumn, delColumn, selectedColumn, setSelectedColumn, swapColumns, moveTasksInColumn, moveTaskBetweenColumn, delTask, boardId, saveData, resetBoardData, getData, getUserBoardsData, isLoading,
}) => {
  const { token, userId } = useContext(AuthContext);
  const { resetTimeout } = useContext(TimeoutContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [willBeDeleted, setWillBeDeleted] = useState(null);

  useEffect(() => {
    resetTimeout();
    getData(boardId);
  }, []);

  const saveDataHandler = () => {
    resetTimeout();
    saveData(boardId, token);
    getUserBoardsData(userId, token);
  };

  const isLargeScreen = useMediaQuery({ minWidth: 700 });

  const flagColumnHandler = useCallback((columnId, ignore) => {
    if (!selectedColumn && !ignore) {
      setSelectedColumn(columnId);
    } else if (selectedColumn === columnId) {
      setSelectedColumn(null);
    } else if (!ignore) {
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
    return <LoadingOverlay />;
  }

  return (
    <BoardStyled>
      {isLoading && <LoadingOverlay />}
      <TaskModal boardId={boardId} />
      <WarningDialog
        open={openDialog}
        onContinue={() => {
          delColumn(willBeDeleted);
          setOpenDialog(false);
        }}
        onClose={() => setOpenDialog(false)}
        msg="Are you sure you want to delete this column?"
      />
      <BackButton
        component={Link}
        to="/"
        onClick={() => {
          saveDataHandler();
          resetBoardData();
        }}
      >
        BACK
      </BackButton>
      <TitleWrapper>
        <EditableTitle
          title={title}
          changeTitle={changeTitle}
          style={titleInputStyle}
          rows={1}
          allowEnter
        />
      </TitleWrapper>
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
                  boardId={boardId}
                  key={columnId}
                  isLargeScreen={isLargeScreen}
                  columnId={columnId}
                  delColumn={delColumn}
                  flagColumnHandler={flagColumnHandler}
                  setOpenDialog={setOpenDialog}
                  setWillBeDeleted={setWillBeDeleted}
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
      <ButtonStyled onClick={saveDataHandler}>Save Board</ButtonStyled>
    </BoardStyled>
  );
};

export default Board;
