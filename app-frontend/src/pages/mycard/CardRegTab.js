import styled from 'styled-components';
import CardRegFormBox from './CardRegFormBox';
import CommonCardListBox from '../../common/CommonCardListBox';
import CommonPageInfo from '../../common/CommonPageInfo';
import { cardMockData } from '../../mockData/cardMockData.js';

const Root = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  gap: 25px;
`;

const ListBox = styled.div`
  width: 100%;
  height: 628px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const CardRegTab = () => {
  return (
    <>
      <CommonPageInfo
        title="나의 카드 등록"
        text={
          <p>
            소비패턴을 확인하고 싶은 카드로 등록하세요. <br />
            등록하고 싶은 카드를 입력 후 카드 리스트에서 확인하세요.
          </p>
        }
      />
      <Root>
        <CardRegFormBox />
        <ListBox>
          <CommonCardListBox data={cardMockData} showDetailed={true} />
        </ListBox>
      </Root>
    </>
  );
};

export default CardRegTab;
