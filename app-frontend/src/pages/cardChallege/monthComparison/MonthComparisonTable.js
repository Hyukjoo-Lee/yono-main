import React from 'react';
import styled from 'styled-components';
import MonthGuide from './MonthGuide';

const TextWrap = styled.div`
  width: 720px;
  height: 570px;
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
  // margin-top: 10px;
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

const MonthComparisionTable = ({ data }) => {
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <TextWrap>
      <TitleGroup>
        <Titlediv>
          <p>저저번달에 사용하신 금액</p>
          <hr />
          <span>
            {(data.previousToPreviousMonthAmount ?? 0).toLocaleString()}원
          </span>
        </Titlediv>
        <Titlediv>
          <p>저번달에 사용하신 금액</p>
          <hr />
          <span>{(data.previousMonthAmount ?? 0).toLocaleString()}원</span>
        </Titlediv>
      </TitleGroup>
      <MonthGuide />
      <TitleGroup>
        <Titlediv>
          <p>등수</p>
          <hr />
          <span>{(data.previousBadgeRanking ?? 0).toLocaleString()}등</span>
        </Titlediv>
        <Titlediv>
          <p>뱃지 갯수</p>
          <hr />
          <span>{(data.PreviousBadgeCount ?? 0).toLocaleString()}개</span>
        </Titlediv>
      </TitleGroup>
    </TextWrap>
  );
};

export default MonthComparisionTable;
