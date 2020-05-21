import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { Button, Paper } from '@material-ui/core';
import { Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import TaskContainer from '../task/TaskContainer';

const ColumnStyled = styled(Paper)`
  background: #EBECF0;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 6px;
  margin: 10px;
  flex-grow: 1;
  width: 300px;
  max-width: ${({ isLargeScreen }) => (isLargeScreen ? '300px' : 'default')};
`;


const TaskList = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    margin-left: 8px;
  }

  .MuiButtonBase-root {
    max-width: 30px;
    max-height: 30px;
    min-width: 30px;
    min-height: 30px;
  }
  .button-swap, .button-del {
    border-radius: 30px;
    color: black;
    max-width: 20px;
  }

  .button-del {
    color: red;
  }

  .icon {
    width: 17px;
    height: 17px;
  }
`;

const Header = React.memo(({ title }) => {
  console.log('TITLE');
  return (
    <HeaderStyled>
      <h1>{title}</h1>
    </HeaderStyled>
  );
});

const Column = forwardRef(({
  skipRender, title, columnId, addTask, addColumn, delColumn, flagColumnHandler, taskOrder, isLargeScreen, boardSelectedColumn,
}, ref) => {
  console.log('rendering ', columnId)
  if (skipRender) {
    return null;
  }
  return (
    <ColumnStyled
      isLargeScreen={isLargeScreen}
      elevation={boardSelectedColumn === columnId ? 24 : 0}
    >
      <Header title={title} />
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {taskOrder.map((taskId, index) => (
              <TaskContainer
                columnId={columnId}
                taskId={taskId}
                index={index}
              />
            ))}
            { provided.placeholder }
          </TaskList>
        )}
      </Droppable>
      <Button onClick={() => delColumn(columnId)}>Delete column</Button>
      <Button onClick={() => addColumn(columnId, uuidv4())}>Insert Column</Button>
      <Button onClick={() => addTask(columnId, uuidv4())}>Add Task</Button>
      <Button onClick={() => flagColumnHandler(columnId)}>Swap column</Button>
    </ColumnStyled>
  );
});

export default React.memo(Column);
