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
  id, date, task, type,
}) => {
  console.log('rendering event ', id);
  let dot;
  if (type === 'T') {
    dot = <Dot colour="red" />;
  } if (type === 'A') {
    dot = <Dot colour="blue" />;
  }
  return (
    <>
      {dot}
      <EventModal
        task={task}
      />
    </>
  )
};

export default Event;
