import React from 'react';
import styled from 'styled-components';
import MainBox1_img from '../../assets/images/main_box1.svg';
import MainBox2_img from '../../assets/images/main_box2.svg';
import MainBox3_img from '../../assets/images/main_box3.svg';
import MainBox4_img from '../../assets/images/main_box4.svg';
import MainBox5_img from '../../assets/images/main_box5.svg';

const StyledMainBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 50px;
`;

const StyledBox = styled.div`
  width: 195px;
  height: 216px;
  border: 1px solid #dedede;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledBoxTitle = styled.p`
  margin: 0;
  padding-bottom: 5px;
  font-size: 24px;
  text-align: center;
  font-weight: bold;
`;

const StyledBoxSubTitle = styled.p`
  margin: 0;
  padding: 0;
  font-size: 18px;
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: black;
  padding: 0;
`;

const StyledBoxImg = styled.div`
  width: 120px;
  height: 120px;
  padding-top: 10px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;

  & img {
    width: 90%;
  }
  & img:nth-of-type(1) {
    padding-left: 8px;
  }
  & img:nth-of-type(2) {
    width: 100px;
    height: 100px;
  }
`;
const MainComponent = () => {
  const mainBoxData = [
    {
      title: `카드등록`,
      subtitle: `나의 카드 등록하기`,
      imgSrc: MainBox1_img,
      link: `/mycard`,
    },

    {
      title: `패턴분석`,
      subtitle: `나의 카드 분석하기`,
      imgSrc: MainBox3_img,
      link: `/card-analysis`,
    },
    {
      title: `카드추천`,
      subtitle: `나의 카드 추천보기`,
      imgSrc: MainBox2_img,
      link: `/mycard`,
      // 카드추천으로 넘어가는거 질문
    },
    {
      title: `랭킹확인`,
      subtitle: `나의 랭킹 확인하기`,
      imgSrc: MainBox4_img,
      link: `/card-challege`,
    },
    {
      title: `커뮤니티`,
      subtitle: `나만의 꿀팁 공유하기`,
      imgSrc: MainBox5_img,
      link: `/community`,
    },
  ];

  return (
    <StyledMainBox>
      {mainBoxData.map((box, index) => (
        <StyledLink href={box.link} key={index}>
          <StyledBox>
            <StyledBoxTitle>{box.title}</StyledBoxTitle>
            <StyledBoxSubTitle>{box.subtitle}</StyledBoxSubTitle>
            <StyledBoxImg>
              <img className="box_img" src={box.imgSrc} alt={box.title} />
            </StyledBoxImg>
          </StyledBox>
        </StyledLink>
      ))}
    </StyledMainBox>
  );
};

export default MainComponent;
