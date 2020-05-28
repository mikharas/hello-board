import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import {
  List,
  Paper,
  LinearProgress,
} from '@material-ui/core';
import TodoItem from '../todoitem/TodoItemContainer';
import NewTodoItem from '../todoitem/NewTodoItem';

const Wrapper = styled.div`
  text-align: center;

  .progress-text {
    font-size: 14px;
  }
`;

const ListWrapper = styled(Paper)`
  width: 100%;
  max-height: 320px;
  overflow: auto;
`;

const Title = styled.h1`
  font-size: 20px;
`;

const TodoList = ({
  todo, taskId, addTodoItem, completedPercentage, columnId,
}) => {
  const progressBar = (
    <>
      <p className="progress-text">
        { Math.floor(completedPercentage) || 0 }
        % completed
      </p>
      <LinearProgress
        variant="determinate"
        color="secondary"
        value={completedPercentage || 0}
      />
    </>
  );

  console.log('rendering todolist ', taskId);
  return (
    <Wrapper>
      <Title>Check List</Title>
      {todo.length !== 0 && progressBar}
      <Droppable droppableId={taskId}>
        {provided => (
          <ListWrapper
            ref={provided.innerRef}
            {...provided.droppableProps}
            elevation={0}
          >
            <List>
              {todo.map((todoItemId, index) => (
                <TodoItem
                  index={index}
                  taskId={taskId}
                  columnId={columnId}
                  todoItemId={todoItemId}
                />
              ))}
            </List>
            {provided.placeholder}
          </ListWrapper>
        )}
      </Droppable>
      <NewTodoItem
        taskId={taskId}
        addTodoItem={addTodoItem}
      />
    </Wrapper>
  );
};

export default React.memo(TodoList);
