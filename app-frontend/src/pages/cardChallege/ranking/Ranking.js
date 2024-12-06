import React from 'react';
import styled from 'styled-components';
import RankingComponent from './RankingComponent';
import RankingTable from './RankingTable';

const Root = styled.div`
  width: ${(props) => props.theme.display.sm};
  margin: 0 auto;
`;

const Ranking = () => {
  return (
    <Root>
      <RankingComponent />
      <RankingTable />
    </Root>
  );
};
export default Ranking;
