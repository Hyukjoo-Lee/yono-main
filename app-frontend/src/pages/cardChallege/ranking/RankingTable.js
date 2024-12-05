import React from 'react';
import styled from 'styled-components';
import image1 from '../../../assets/images/Image1.jpg';
import image2 from '../../../assets/images/Image2.jpg';
import image3 from '../../../assets/images/Image3.png';
import image4 from '../../../assets/images/Image4.jpg';

const Root = styled.div`
  width: 100%;
`;

const BoxStyle = styled.div`
  width: 100%;
  border-radius: 7px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.color.brightGray};
  overflow: hidden;
  & > div:nth-child(1) {
    background: ${(props) => props.theme.color.lightBlue} !important;
    & p {
      font-weight: normal !important;
      color: ${(props) => props.theme.color.gray} !important;
    }
  }
`;

const BoxIn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 33px;
  box-sizing: border-box;
  border-bottom: 1px solid ${(props) => props.theme.color.brightGray};
`;
const BoxInStyle = styled.div`
  max-height: 400px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  & > div:nth-child(1),
  > div:nth-child(2),
  > div:nth-child(3) {
    & p {
      font-weight: bold;
      color: ${(props) => props.theme.color.blue};
    }
  }
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
`;

const TextStyle = styled.p`
  min-width: 50px;
  font-size: ${(props) => props.theme.fontSize.base};
  color: ${(props) => props.theme.color.gray};
  margin: 0px;
`;

const NumberText = styled(TextStyle)`
  text-align: right;
`;

const ProfileBox = styled.div`
  width: 45px;
  height: 45px;
  border: 1px solid ${(props) => props.theme.color.brightGray};
  border-radius: 50%;
  margin: 0 10px;
  overflow: hidden;
  background: ${(props) => props.theme.color.white};
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RankingTable = () => {
  const items = [
    { number: 1, img: image1, name: '한글이름님(영어아이디)', count: 65000 },
    { number: 2, img: image2, name: '한글이름님(영어아이디)', count: 50000 },
    { number: 3, img: image3, name: '한글이름님(영어아이디)', count: 40000 },
    { number: 4, img: image4, name: '한글이름님(영어아이디)', count: 5000 },
    { number: 5, img: image1, name: '한글이름님(영어아이디)', count: 5000 },
    { number: 6, img: image2, name: '한글이름님(영어아이디)', count: 5000 },
    { number: 7, img: image3, name: '한글이름님(영어아이디)', count: 400 },
    { number: 8, img: image4, name: '한글이름님(영어아이디)', count: 400 },
    { number: 9, img: image1, name: '한글이름님(영어아이디)', count: 400 },
    { number: 10, img: image2, name: '한글이름님(영어아이디)', count: 400 },
    { number: 11, img: image3, name: '한글이름님(영어아이디)', count: 400 },
    { number: 12, img: image4, name: '한글이름님(영어아이디)', count: 400 },
  ];
  return (
    <Root>
      <BoxStyle>
        <BoxIn>
          <TextBox>
            <TextStyle>15</TextStyle>
            <ProfileBox>
              <img src={image4} alt="image1" />
            </ProfileBox>
            <TextStyle>한글이름님(영어아이디)</TextStyle>
          </TextBox>
          <NumberText>200</NumberText>
        </BoxIn>
        <BoxInStyle>
          {items.map((item, index) => (
            <BoxIn key={index}>
              <TextBox>
                <TextStyle>{item.number}</TextStyle>
                <ProfileBox>
                  <img src={item.img} alt={item.name} />
                </ProfileBox>
                <TextStyle>{item.name}</TextStyle>
              </TextBox>
              <NumberText>{item.count.toLocaleString()}</NumberText>
            </BoxIn>
          ))}
        </BoxInStyle>
      </BoxStyle>
    </Root>
  );
};
export default RankingTable;
