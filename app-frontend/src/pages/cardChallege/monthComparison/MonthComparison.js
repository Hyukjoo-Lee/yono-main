import React from 'react';
import styled from 'styled-components';
import Barchart from './Barchart';

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
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 7px;
`;

const Titlediv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
`;

const Titlediv2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

const barchart_data = [
  {
    bottle: '저번달',
    문화: 3000,
    전자제품: 1500,
  },
  {
    bottle: '이번달',
    문화: 10000,
    전자제품: 3500,
  },
];

const MonthComparision = () => {
  return (
    <Root>
      <TextWrap>
        <Titlediv>전달에 사용하신 금액은</Titlediv>
        <Titlediv2>2,000,0000원 입니다.</Titlediv2>
        <br />
        <Titlediv>이번달에 사용하신 금액은</Titlediv>
        <Titlediv2>1,000,0000원 입니다.</Titlediv2>
        <br />
        <Titlediv>이번달 예상 뱃지 갯수는</Titlediv>
        <Titlediv2>200개 입니다.</Titlediv2>
      </TextWrap>
      <Barchart data={barchart_data} />
    </Root>
  );
};

export default MonthComparision;
