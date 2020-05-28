import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const Background = styled.div`
  color: #fff;
  z-index: -10;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoadingOverlay = () => (
  <Background>
    <CircularProgress
      color="secondary"
      size="50px"
      thickness="5"
      value="50"
    />
  </Background>
);

export default LoadingOverlay;
