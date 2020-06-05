import React from 'react';
import styled from 'styled-components'

const Wrapper = styled.div`
  background: red;
  height: 30px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  margin: 5px;

  h3 {
    text-align: center;
    font-size: 20px;
    font-weight: normal;
    color: #fff;
  }
`;

const Event = ({
  id, date, taskTitle, taskDescription,
}) => {
  console.log('rendering event ', id);
  return (
    <Wrapper>
      <h3>Event here</h3>
    </Wrapper>
  );
};

export default Event;
