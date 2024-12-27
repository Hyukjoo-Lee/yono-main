import React from 'react';
import styled from 'styled-components';
import Barchart from './Barchart';
import useCountUp from './UseCountUp';

const Root = styled.div`
  width: 100%;
  height: 545px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
  align-items: center;
  font-size: 30px;
  // font-weight: bold;
  padding-bottom: 30px;
`;

// const Titlediv2 = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 30px;
// `;

const BarchartWrap = styled.div`
  width: 480px;
  height: 530px;
`;

const barchart_data = [
  {
    bottle: '저번달',
    목표금액: 3000,
    사용금액: 2000,
  },
  {
    bottle: '이번달',
    목표금액: 2000,
    사용금액: 1500,
  },
];

const MonthComparision = () => {
  const previousMonthAmount = useCountUp(2000000); // 전달 금액
  const currentMonthAmount = useCountUp(1000000); // 이번달 금액
  const badgeCount = useCountUp(200); // 예상 뱃지 개수

  return (
    <Root>
      <TextWrap>
        <Titlediv>
          전달에 사용하신 금액은 &nbsp;{' '}
          <b>{previousMonthAmount.toLocaleString()}원</b>&nbsp; 입니다.
        </Titlediv>
        {/* <Titlediv2>{previousMonthAmount.toLocaleString()}원 입니다.</Titlediv2> */}
        <br />
        <Titlediv>
          이번달에 사용하신 금액은 &nbsp;
          <b>{currentMonthAmount.toLocaleString()}원</b>&nbsp; 입니다.
        </Titlediv>
        {/* <Titlediv2>{currentMonthAmount.toLocaleString()}원 입니다.</Titlediv2> */}
        <br />
        <Titlediv>
          이번달 예상 뱃지 갯수는 &nbsp; <b>{badgeCount.toLocaleString()}개</b>
          &nbsp; 입니다.
        </Titlediv>
        {/* <Titlediv2>{badgeCount.toLocaleString()}개 입니다.</Titlediv2> */}
      </TextWrap>
      <BarchartWrap>
        <Barchart data={barchart_data} />
      </BarchartWrap>
    </Root>
  );
};

export default MonthComparision;
