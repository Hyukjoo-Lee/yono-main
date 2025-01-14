import React from 'react';
import styled from 'styled-components';
import useCountUp from './UseCountUp';

const TextWrap = styled.div`
  width: 720px;
  height: 530px;
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Titlediv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  border-radius: 7px;
  width: 335px;
  height: 235px;
  margin-top: 20px;
  background-color: ${(props) => props.theme.color.lightBlue};
  & p {
    padding-bottom: 30px;
    font-size: ${(props) => props.theme.fontSize.md};
    margin: 0px;
  }
  & span {
    font-size: ${(props) => props.theme.fontSize.xl};
    font-weight: bold;
  }
  & hr {
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    margin: 0 20px 40px 20px;
    width: 70%;
  }
`;

const TitleGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const MonthComparisionTable = () => {
  const previousMonthAmount = useCountUp(2000000); // 전달 금액
  const currentMonthAmount = useCountUp(1000000); // 이번달 금액
  const previousbadgeCount = useCountUp(200); // 전달 뱃지 갯수
  const currentbadgeCount = useCountUp(300); // 예상 뱃지 개수

  return (
    <TextWrap>
      <TitleGroup>
        <Titlediv>
          <p>전달에 사용하신 금액</p>
          <hr />
          <span>{previousMonthAmount.toLocaleString()}원</span>
        </Titlediv>
        <Titlediv>
          <p>이번달에 사용하신 금액</p>
          <hr />
          <span>{currentMonthAmount.toLocaleString()}원</span>
        </Titlediv>
      </TitleGroup>
      <TitleGroup>
        <Titlediv>
          <p>저번달 뱃지 갯수</p>
          <hr />
          <span>{previousbadgeCount.toLocaleString()}개</span>
        </Titlediv>
        <Titlediv>
          <p>이번달 예상 뱃지 갯수</p>
          <hr />
          <span>{currentbadgeCount.toLocaleString()}개</span>
        </Titlediv>
      </TitleGroup>
    </TextWrap>
  );
};

export default MonthComparisionTable;
