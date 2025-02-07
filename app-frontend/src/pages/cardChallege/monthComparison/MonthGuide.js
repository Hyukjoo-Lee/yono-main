import React from 'react';
import styled from 'styled-components';

const GuideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  margin-top: -10px;
`;

const GuideText = styled.p`
  cursor: pointer;
`;

const GuideHover = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 20px;
  background: #eff3fd;
  border: 1px solid #757575;
  border-radius: 7px;
  position: absolute;
  top: 30px;
  left: 0;
  display: none;
  justify-content: center;
  align-items: center;

  ${GuideWrapper}:hover & {
    display: flex;
  }
`;

const MonthGuide = () => {
  return (
    <GuideWrapper>
      <GuideText>YONO 이용방법</GuideText>
      <GuideHover>
        <p>
          <strong>뱃지를 받는 TIP!</strong>
          <br />
          절약하면 할수록 더 많은 뱃지를 받을 수 있어요!
          <br />
          ✅ 전달 대비 1% 절약 → 100개 지급
          <br />
          ✅ 전달 대비 2% 절약 → 200개 지급
          <br />
          ✅ 전달 대비 10% 절약 → 1,000개 지급
          <br />✅ 절약률(%) × 100 = 지급되는 뱃지 개수
        </p>
      </GuideHover>
    </GuideWrapper>
  );
};

export default MonthGuide;
