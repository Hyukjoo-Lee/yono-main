import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  width: 100%;
`;

const BoxStyle = styled.div`
  width: 100%;
  max-height: 400px;
  border-radius: 7px;
  border: ${(props) => props.theme.color.brightGray};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.color.brightGray};
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

const MyBoxStyle = styled(BoxStyle)`
  margin-bottom: 30px;
  border: 0px;
  & > div {
    background: ${(props) => props.theme.color.lightBlue} !important;
    border-bottom: 0px;
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

const ProfileBox = styled.div`
  width: 45px;
  height: 45px;
  background: ${(props) => props.theme.color.brightGray};
  border-radius: 50%;
  margin: 0 10px;
`;

const RankingTable = () => {
  const items = [
    { number: 1, img: '', name: '한글이름님(영어아이디)', count: 65000 },
    { number: 2, img: '', name: '한글이름님(영어아이디)', count: 50000 },
    { number: 3, img: '', name: '한글이름님(영어아이디)', count: 40000 },
    { number: 4, img: '', name: '한글이름님(영어아이디)', count: 5000 },
    { number: 5, img: '', name: '한글이름님(영어아이디)', count: 5000 },
    { number: 6, img: '', name: '한글이름님(영어아이디)', count: 5000 },
    { number: 7, img: '', name: '한글이름님(영어아이디)', count: 400 },
    { number: 8, img: '', name: '한글이름님(영어아이디)', count: 400 },
    { number: 9, img: '', name: '한글이름님(영어아이디)', count: 400 },
    { number: 10, img: '', name: '한글이름님(영어아이디)', count: 400 },
    { number: 11, img: '', name: '한글이름님(영어아이디)', count: 400 },
    { number: 12, img: '', name: '한글이름님(영어아이디)', count: 400 },
  ];
  return (
    <Root>
      <MyBoxStyle>
        <BoxIn>
          <TextBox>
            <TextStyle>1</TextStyle>
            <ProfileBox></ProfileBox>
            <TextStyle>한글이름님(영어아이디)</TextStyle>
          </TextBox>
          <TextStyle>65,000</TextStyle>
        </BoxIn>
      </MyBoxStyle>
      <BoxStyle>
        {items.map((item, index) => (
          <BoxIn key={index}>
            <TextBox>
              <TextStyle>{item.number}</TextStyle>
              <ProfileBox></ProfileBox>
              <TextStyle>{item.name}</TextStyle>
            </TextBox>
            <TextStyle>{item.count}</TextStyle>
          </BoxIn>
        ))}
      </BoxStyle>
    </Root>
  );
};
export default RankingTable;
