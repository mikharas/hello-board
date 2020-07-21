import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
import EventModal from './EventModal';

const Wrapper = styled(Button)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  position: relative;
  overflow: hidden;


  .text {
    margin: 0;
    padding: 0;
    font-size: 15px;
    font-family: inherit;
    color: black;
    text-transform: none;
    text-align: left;
    height: 100%;
    width: 55%;
    position: absolute;
    top: 0;
    left: 43px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
  }

`;

const Dot = styled.div`
  background: ${props => props.colour};
  height: 20px;
  width: 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  margin-top: 5px;
  margin-left: 15px;

  .MuiIconButton-root .MuiButton-label{
    font-size: 15px;
    margin: 0;
    padding: 0;
    width: 100%;
  }
`;

const Event = ({
  id, date, title, description, todo, boardId, setSelectedTask,
}) => {
  console.log('rendering event ', id);
  return (
    <Wrapper onClick={() => setSelectedTask(id)}>
      <NavLink
        to={`/boards/${boardId}`}
      >
        <Dot colour="teal" />
        <div className="text">{title}</div>
      </NavLink>
    </Wrapper>
  );
};

export default Event;
