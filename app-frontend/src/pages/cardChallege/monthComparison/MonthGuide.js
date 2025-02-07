import React from 'react';
import styled from 'styled-components';
import Check from '../../../assets/images/tip_check.svg';
import Light from '../../../assets/images/tip_light.svg';
import Pushpin from '../../../assets/images/tip_pushpin.svg';

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
  height: 250px;
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

const GuideContent = styled.div`
  & img {
    width: 16px;
    height: 16px;
  }
`;

const MonthGuide = () => {
  return (
    <GuideWrapper>
      <GuideText>YONO 이용방법</GuideText>
      <GuideHover>
        <GuideContent>
          <p style={{ margin: '0px' }}>
            <img
              src={Light}
              alt="전구 아이콘"
              style={{ width: '18px', height: '18px' }}
            />
            <strong>뱃지를 받는 TIP!</strong>
          </p>
          <br />
          절약하면 할수록 더 많은 뱃지를 받을 수 있어요!
          <br />
          <img src={Check} alt="체크 아이콘" />
          전달 대비 1% 절약 → 100개 지급
          <br />
          <img src={Check} alt="체크 아이콘" />
          전달 대비 2% 절약 → 200개 지급
          <br />
          <img src={Check} alt="체크 아이콘" />
          전달 대비 10% 절약 → 1,000개 지급
          <br />
          <img src={Check} alt="체크 아이콘" />
          절약률(%) × 100 = 지급되는 뱃지 개수
          <br />
          <br />
          <img src={Pushpin} alt="핀 아이콘" />
          최대 지급 뱃지 갯수 : 10,000개
          <br />
          <img src={Pushpin} alt="핀 아이콘" />
          절약률은 소수점 두번째 자리까지 반영됩니다!
        </GuideContent>
      </GuideHover>
    </GuideWrapper>
  );
};

export default MonthGuide;
