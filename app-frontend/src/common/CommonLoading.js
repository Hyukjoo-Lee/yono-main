import React from 'react';
import styled from 'styled-components';
import { CircularProgress, Typography } from '@mui/material';
import theme from '../theme/theme';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;

const LoadingText = styled(Typography)`
  margin-top: 20px;
  font-size: ${theme.fontSize.lg};
`;

const CommonLoading = ({ message = '데이터 로딩 중...' }) => {
  return (
    <LoadingContainer>
      <CircularProgress />
      <LoadingText>{message}</LoadingText>
    </LoadingContainer>
  );
};

export default CommonLoading;
