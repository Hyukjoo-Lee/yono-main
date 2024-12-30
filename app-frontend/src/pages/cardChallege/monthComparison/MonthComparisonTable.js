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
  // border: 1px solid rgba(169, 169, 169, 0.3);
  // border-radius: 7px;
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
  background-color: #eff3fd;
  & p {
    padding-bottom: 30px;
    font-size: 20px;
    margin: 0px;
  }
  & span {
    font-size: 30px;
    font-weight: bold;
  }
`;

const TitleGroup = styled.div`
  display: flex;
  justify-content: space-between; /* 두 Titlediv를 좌우로 배치 */
  width: 100%;
`;

const MonthComparisionTable = () => {
  const previousMonthAmount = useCountUp(2000000); // 전달 금액
  const currentMonthAmount = useCountUp(1000000); // 이번달 금액
  const previousbadgeCount = useCountUp(200); // 예상 뱃지 개수
  const currentbadgeCount = useCountUp(300); // 예상 뱃지 개수

  return (
    <TextWrap>
      <TitleGroup>
        <Titlediv>
          <p>
            전달에 사용하신 금액
            <br />
            <hr />
          </p>
          <span>{previousMonthAmount.toLocaleString()}원</span>
        </Titlediv>
        <br />
        <Titlediv>
          <p>
            이번달에 사용하신 금액
            <br />
            <hr />
          </p>
          <span>{currentMonthAmount.toLocaleString()}원</span>
        </Titlediv>
      </TitleGroup>
      <TitleGroup>
        <Titlediv>
          <p>
            저번달 뱃지 갯수
            <br />
            <hr />
          </p>
          <span>{previousbadgeCount.toLocaleString()}개</span>
        </Titlediv>
        <Titlediv>
          <p>
            이번달 예상 뱃지 갯수
            <br />
            <hr />
          </p>
          <span>{currentbadgeCount.toLocaleString()}개</span>
        </Titlediv>
      </TitleGroup>
    </TextWrap>
  );
};

export default MonthComparisionTable;
