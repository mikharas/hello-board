import React from 'react';
import styled from 'styled-components';
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
  id, date, title, description, todo,
}) => {
  console.log('rendering event ', id);
  return (
    <>
      <Dot colour="red" />
      <EventModal
        title={title}
        description={description}
        todo={todo}
      />
    </>
  );
};

export default Event;
