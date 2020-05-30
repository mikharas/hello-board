import React, { useCallback, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import {
  Checkbox,
  ClickAwayListener,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import EditableTitle from '../subcomponents/editableTitle';

const ItemStyled = styled(ListItem)`
  background: ${({ isHovered, isDragging }) => (isHovered || isDragging ? '#EBECF0' : '#fff')};
  border-radius: 15px;
  text-decoration: ${({ isChecked }) => isChecked && 'line-through'};
  color: ${({ isChecked }) => isChecked && 'red'};
  height: 50px;
`;

const titleStyle = {
  width: '100%',
  outline: 'none',
  border: 'none',
  fontWeight: 'normal',
  fontSize: '15px',
  fontFamily: 'inherit',
};

const titleStyleGrayed = {
  width: '100%',
  color: 'red',
  textDecoration: 'line-through',
  outline: 'none',
  border: 'none',
  fontWeight: 'normal',
  fontSize: '15px',
  fontFamily: 'inherit',
};

const TodoItem = ({
  key, index, columnId, todoItemId, title, isCompleted, changeTitle, toggleIsCompleted, taskId, incrementCompleted, decrementCompleted, delTodoItem, addTask,
}) => {
  console.log('rendering todoitem ', todoItemId);

  const [isHovered, setIsHovered] = useState(false);

  const changeTodoItemTitle = useCallback((newTitle) => {
    changeTitle(todoItemId, newTitle);
  }, [todoItemId]);

  return (
    <Draggable
      key={todoItemId}
      draggableId={todoItemId}
      index={index}
    >
      {(provided, snapshot) => (
        <ItemStyled
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isHovered={isHovered}
          isDragging={snapshot.isDragging}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Checkbox
            checked={isCompleted}
            edge="start"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation();
              toggleIsCompleted(todoItemId);
              if (isCompleted) decrementCompleted(taskId);
              else incrementCompleted(taskId);
            }}
          />
          <EditableTitle
            title={title}
            changeTitle={changeTodoItemTitle}
            style={titleStyle}
            normalStyle={isCompleted ? titleStyleGrayed : titleStyle}
          />
          <Button
            onClick={() => {
              delTodoItem(taskId, todoItemId);
              if (isCompleted) {
                decrementCompleted(taskId);
              }
            }}
          >
            Del
          </Button>
          <Button
            onClick={() => {
              addTask(columnId, uuidv4(), title);
              delTodoItem(taskId, todoItemId);
            }}
          >
            Change
          </Button>
        </ItemStyled>
      )}
    </Draggable>
  );
};

export default React.memo(TodoItem);
