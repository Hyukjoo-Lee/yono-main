import { useState } from 'react';
import styled from 'styled-components';
import CardRegFormBox from './CardRegFormBox';
import CompanyRegFormBox from './CompanyRegFormBox';
import CommonCardListBox from '../../common/CommonCardListBox';
import CommonPageInfo from '../../common/CommonPageInfo';
import CommonButton from '../../common/CommonButton';
import { setPrimaryCard } from '../../apis/cardApi';
import CommonDialog from '../../common/CommonDialog';
import Tooltip from '@mui/material/Tooltip';
import theme from '../../theme/theme';

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

const EmptyBox = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid ${(props) => props.theme.color.mediumGray};
  border-radius: 7px;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const CardRegTab = ({ user, userCards }) => {
  const [isPrimaryCardSetSuccess, setIsPrimaryCardSetSuccess] = useState(false);
  const [isPrimaryCardSetFail, setIsPrimaryCardSetFail] = useState(false);
  const [isRegisteringCompany, setIsRegisteringCompany] = useState(false);

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
            소비패턴을 확인하고 싶은 카드를 등록하세요. <br />
            등록하고 싶은 카드를 입력 후 카드 리스트에서 확인하세요.
          </p>
        }
      />
      <ButtonContainer>
        <ButtonContainer>
          <CommonButton
            text={'카드사 등록하기'}
            fontSize="16px"
            background={theme.color.lightBlue}
            $hoverBk={theme.color.lightBlue}
            $hoverColor="#496CE8"
            $borderColor={theme.color.white}
            color={isRegisteringCompany ? '#496CE8' : '#4A4A4A'}
            $borderRadius="0"
            onClick={() => setIsRegisteringCompany(true)}
          />

          <Tooltip
            title="카드사를 등록하지 않으셨다면, 먼저 카드사 등록을 진행해 주세요."
            arrow
            placement="top"
            disableHoverListener={!isRegisteringCompany}
          >
            <span>
              <CommonButton
                text={'카드 등록하기'}
                fontSize="16px"
                background={theme.color.lightBlue}
                $hoverBk={theme.color.lightBlue}
                $hoverColor="#496CE8"
                $borderColor={theme.color.white}
                color={!isRegisteringCompany ? '#496CE8' : '#4A4A4A'}
                $borderRadius="0"
                onClick={() => setIsRegisteringCompany(false)}
              />
            </span>
          </Tooltip>
        </ButtonContainer>
      </ButtonContainer>

      <Root>
        {isRegisteringCompany ? (
          <CompanyRegFormBox user={user} />
        ) : (
          <CardRegFormBox user={user} />
        )}
        {userCards.length > 0 ? (
          <ListBox>
            <CommonCardListBox
              data={userCards}
              showDetailed={true}
              onCardSelect={handleCardSelect}
            />
          </ListBox>
        ) : (
          <EmptyBox>
            <p>등록된 카드가 없습니다.</p>
          </EmptyBox>
        )}
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
