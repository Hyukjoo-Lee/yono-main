import React from 'react';
import styled from 'styled-components';
import { CircularProgress, Typography } from '@mui/material';
import theme from '../theme/theme';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  & .MuiCircularProgress-root {
    margin-bottom: 20px;
  }
`;

const LoadingText = styled(Typography)`
  font-size: ${theme.fontSize.base};
  color: ${theme.color.gray};
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
