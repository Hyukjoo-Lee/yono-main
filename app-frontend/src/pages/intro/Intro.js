import React, { useState } from 'react';
import styled from 'styled-components';
import Info_icon from '../../assets/images/info_icon.svg';
import Sample from '../../assets/images/Sample.svg';
import CommonRoot from '../../common/CommonRoot';
import InfoInfo from './IntroInfo';

const StyledWrap = styled.div`
  width: 1200px;
  height: 1024px;
`;

const StyledInfoMain = styled.div`
  width: 1200px;
  height: 750px;
  display: flex;
  justify-content: space-between;
`;
const StyledInfoImg = styled.div`
  width: 570px;
  height: 750px;
  border-radius: 7px;
  background-color: #eff3fd;
`;

const StyledInfo = styled.div`
  width: 570px;
  height: 750px;
`;
export function Intro() {
  const [infoContent, setInfoContent] = useState();

  const InfoInfoData = [
    {
      img: Info_icon,
      title: 'YONO 소개',
      subtitle:
        'YONO(You Need Only On)은 내가 사용하는 카드를 불러와 나의 소비패턴을 분석하고 절약이 필요한 부분을 알려줍니다.YONO의 주요 기능을 보시려면 해당하는 이모티콘을 클릭해보세요.',
      content: Sample,
    },
    {
      title: '사용한 카드 소비 분석',
      subtitle:
        '유저들의 평소 소비 패턴을 분석해서 일별(원형그래프), 월별(막대그래프), 목차별 통계를 내서 그래프로 보기 쉽게 알려드립니다.패턴 분석 부분의 기능을 보시려면 해당하는 이모티콘을 클릭해보세요.',
    },
    {
      title: '절약 습관을 잡아줄 절약챌린지',
      subtitle:
        '절약을 재밌게 할 수 있는 절약챌린지 입니다. 전달과 비교하여 소비를 줄였을 때 뱃지를 얻을 수 있고, 유저들과 경쟁함으로써 나만의 절약 팁을 만들어보세요.챌린지 기능을 보시려면 해당 이모티콘을 클리해보세요.',
    },
    {
      title: '나의 소비습관으로 카드 추천',
      subtitle:
        '유저의 소비습관을 바탕으로 카드 추천을 해드립니다. 카드사 페이지를 방문해서 비교할 필요 없이 카드의 혜택도 알려드려요.카드 추천 기능을 보시려면 해당 이모티콘을 클릭해보세요.',
    },
    {
      title: 'YONO 꿀팁 공유 커뮤니티',
      subtitle:
        'YONO을 사용하면서 생긴 꿀팁을 공유할 수 있는 커뮤니티입니다. 유저들의 꿀팁을 보면서 나만의 소비패턴에도 적용해보세요.커뮤니티 기능을 보시려면 이모티콘을 클릭해보세요.',
    },
  ];

  const handleCardClick = (content) => {
    setInfoContent(content);
  };
  return (
    <CommonRoot>
      <StyledWrap className="wrap">
        <StyledInfoMain className="info_main">
          <StyledInfoImg className="info_img">
            {infoContent ? (
              <img
                src={infoContent}
                alt="Selected Info"
                style={{ width: '100%', height: 'auto' }}
              />
            ) : (
              <p>왼쪽 아이콘 클릭!</p>
            )}
          </StyledInfoImg>
          <StyledInfo className="info">
            {InfoInfoData.map((data, index) => (
              <InfoInfo
                key={index}
                img={data.img}
                title={data.title}
                subtitle={data.subtitle}
                onClick={() => handleCardClick(data.content)}
              />
            ))}
          </StyledInfo>
        </StyledInfoMain>
      </StyledWrap>
    </CommonRoot>
  );
}
