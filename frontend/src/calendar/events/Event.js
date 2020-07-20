import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
import EventModal from './EventModal';

const Dot = styled.div`
  background: ${props => props.colour};
  height: 40px;
  width: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

const Event = ({
  id, date, title, description, todo, boardId, setSelectedTask,
}) => {
  console.log('rendering event ', id);
  return (
    <>
      <Button onClick={() => {
        setSelectedTask(id);
      }}
      >
        <NavLink
          to={`/boards/${boardId}`}
        >
          <Dot colour="red" />
        </NavLink>
      </Button>
      <EventModal
        title={title}
        description={description}
        todo={todo}
      />
    </>
  );
};

export default Event;
