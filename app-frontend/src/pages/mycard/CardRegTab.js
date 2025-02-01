import styled from 'styled-components';
import CardRegFormBox from './CardRegFormBox';
import CommonCardListBox from '../../common/CommonCardListBox';
import CommonPageInfo from '../../common/CommonPageInfo';
import { setPrimaryCard } from '../../apis/cardApi';
import { useState } from 'react';
import CommonDialog from '../../common/CommonDialog';

const Root = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  gap: 25px;
`;

const ListBox = styled.div`
  width: 100%;
  height: 729px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const CardRegTab = ({ user, userCards }) => {
  const [isPrimaryCardSetSuccess, setIsPrimaryCardSetSuccess] = useState(false);
  const [isPrimaryCardSetFail, setIsPrimaryCardSetFail] = useState(false);

  const handleCardSelect = async (card) => {
    try {
      const userNum = user?.userNum;
      const userCardId = card?.cardId;

      const response = await setPrimaryCard(userNum, userCardId);

      if (response?.status === 200) {
        setIsPrimaryCardSetSuccess(true);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setIsPrimaryCardSetFail(true);
      }
    } catch (error) {
      setIsPrimaryCardSetFail(true);
    }
  };

  const closeDialog = () => {
    setIsPrimaryCardSetSuccess(false);
    setIsPrimaryCardSetFail(false);
  };

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
        <CardRegFormBox user={user} />
        <ListBox>
          <CommonCardListBox
            data={userCards}
            showDetailed={true}
            onCardSelect={handleCardSelect}
          />
        </ListBox>
        <CommonDialog
          open={isPrimaryCardSetSuccess}
          children="대표 카드가 성공적으로 설정되었습니다."
          onClose={closeDialog}
          onConfirm={closeDialog}
        />
        <CommonDialog
          open={isPrimaryCardSetFail}
          children="대표 카드 설정에 실패했습니다."
          onClose={closeDialog}
          onConfirm={closeDialog}
        />
      </Root>
    </>
  );
};

export default CardRegTab;
