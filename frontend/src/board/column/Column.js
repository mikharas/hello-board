import React, { forwardRef, useCallback } from 'react';
import styled from 'styled-components';
import { Paper, IconButton } from '@material-ui/core';
import { Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import TaskContainer from '../task/TaskContainer';
import NewTask from '../task/NewTask';
import EditableTitle from '../subcomponents/editableTitle';

const titleStyleNormal = {
  outline: 'none',
  marginTop: '13px',
  marginBottom: '15px',
  fontFamily: 'inherit',
  fontWeight: 'bold',
  fontSize: '22px',
  padding: '15px',
};

const titleStyle = {
  outline: 'none',
  background: 'white',
  marginTop: '13px',
  marginBottom: '15px',
  fontFamily: 'inherit',
  fontWeight: 'bold',
  fontSize: '22px',
  padding: '15px',
  width: '90%',
  borderRadius: '15px',
  border: '0',
};

const ColumnStyled = styled(Paper)`
  position: relative;
  background: #EBECF0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 6px;
  padding-bottom: 15px;
  margin: 10px;
  flex-grow: 1;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Icons = styled.div`
  position: absolute;
  left: 15px;
  top: 15px;

  .MuiIconButton-root {
    font-size: 15px;
  }

  .del {
    color: red;
  }

  .ins {
    color: green;
  }

  .swp {
    color: yellow;
  }
`;

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 7px;
`;

const Header = React.memo(({ title, changeColumnTitle }) => (
  <HeaderStyled>
    <EditableTitle
      rows={1}
      title={title}
      changeTitle={changeColumnTitle}
      style={titleStyle}
      normalStyle={titleStyleNormal}
    />
  </HeaderStyled>
));

const Column = forwardRef(({
  skipRender, title, changeTitle, columnId, addTask, addColumn, delColumn, flagColumnHandler, taskOrder, isLargeScreen, boardSelectedColumn, boardId, setOpenDialog, setWillBeDeleted,
}, ref) => {
  const changeColumnTitle = useCallback((newTitle) => {
    changeTitle(columnId, newTitle);
  }, [columnId]);

  console.log('rendering ', columnId);
  if (skipRender) {
    return null;
  }

  return (
    <ColumnStyled
      isLargeScreen={isLargeScreen}
      elevation={boardSelectedColumn === columnId ? 24 : 0}
    >
      <Icons>
        <IconButton size="small" className="del">
          <FontAwesomeIcon
            icon={faCircle}
            onClick={() => {
              setWillBeDeleted(columnId);
              setOpenDialog(true);
            }}
          />
        </IconButton>
        <IconButton size="small" className="swp">
          <FontAwesomeIcon
            icon={faCircle}
            onClick={() => flagColumnHandler(columnId)}
          />
        </IconButton>
        <IconButton size="small" className="ins">
          <FontAwesomeIcon
            icon={faCircle}
            onClick={() => addColumn(columnId, uuidv4())}
          />
        </IconButton>
      </Icons>
      <Header title={title} changeColumnTitle={changeColumnTitle} />
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
                boardId={boardId}
              />
            ))}
            { provided.placeholder }
          </TaskList>
        )}
      </Droppable>
      <NewTask
        columnId={columnId}
        addTask={addTask}
      />
    </ColumnStyled>
  );
});

export default React.memo(Column);
