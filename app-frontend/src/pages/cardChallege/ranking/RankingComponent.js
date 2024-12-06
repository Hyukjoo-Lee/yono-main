import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Medal1 } from '../../../assets/images/Medal1.svg';
import { ReactComponent as Medal2 } from '../../../assets/images/Medal2.svg';
import { ReactComponent as Medal3 } from '../../../assets/images/Medal3.svg';
import image1 from '../../../assets/images/Image1.jpg';
import image2 from '../../../assets/images/Image2.jpg';
import image3 from '../../../assets/images/Image3.png';

const Root = styled.div`
  width: 100%;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  & > div:nth-child(1) {
    order: 2;
  }
  & > div:nth-child(2) {
    order: 1;
  }
  & > div:nth-child(3) {
    order: 3;
  }
`;

const BoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CircleBox = styled.div`
  width: ${(props) => (props.$rank === 1 ? '190px' : '150px')};
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.color.brightGray};
  margin: 20px 0px;
  overflow: hidden;
  background: ${(props) => props.theme.color.white};
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 130%;
    height: 130%;
    object-fit: cover;
  }
`;

const NameStyle = styled.p`
  font-size: ${(props) => props.theme.fontSize.md};
  color: #000;
  margin: 0 0 24px;
`;

const Box = styled.div`
  min-width: 180px;
  border-radius: 5px;
  background: ${(props) => props.theme.color.lightBlue};
  padding: 5px 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  & p {
    font-size: ${(props) => props.theme.fontSize.base};
    color: ${(props) => props.theme.color.lightGray};
    margin: 0 0 0 6px;
  }
`;

const RankingComponent = () => {
  const list = [
    { rank: 1, img: image1, name: '변우석 (abc123)', number: 65000 },
    { rank: 2, img: image2, name: '수지 (abc124)', number: 5000 },
    { rank: 3, img: image3, name: '이지은 (abc1235)', number: 4000 },
  ];
  return (
    <Root>
      {list.map((item, index) => (
        <BoxStyle key={index}>
          <CircleBox $rank={item.rank}>
            <img src={item.img} alt={item.name} />
          </CircleBox>
          <NameStyle>{item.name}</NameStyle>
          <Box>
            {item.rank === 1 ? (
              <Medal1 />
            ) : item.rank === 2 ? (
              <Medal2 />
            ) : (
              <Medal3 />
            )}
            <p>{item.number.toLocaleString()}</p>
          </Box>
        </BoxStyle>
      ))}
    </Root>
  );
};
export default RankingComponent;
