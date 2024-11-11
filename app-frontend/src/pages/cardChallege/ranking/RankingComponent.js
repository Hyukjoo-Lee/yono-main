import React from "react";
import styled from "styled-components";
import { ReactComponent as Badge } from "../../../assets/images/Badge.svg";
import { ReactComponent as Badge1 } from "../../../assets/images/Badge1.svg";
import { ReactComponent as Badge2 } from "../../../assets/images/Badge2.svg";
import { ReactComponent as Badge3 } from "../../../assets/images/Badge3.svg";

const Root = styled.div`
  width: 100%;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
`;

const BoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CircleBox = styled.div`
  width: ${(props) => (props.$rank === 1 ? "190px" : "150px")};
  aspect-ratio: 1;
  border-radius: 50%;
  background: ${(props) => props.theme.color.brightGray};
  margin: 20px 0px;
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
    { rank: 2, name: "한글이름님 (영어아이디)", number: 500 },
    { rank: 1, name: "한글이름님 (영어아이디)", number: 65000 },
    { rank: 3, name: "한글이름님 (영어아이디)", number: 300 },
  ];
  return (
    <Root>
      {list.map((item, index) => (
        <BoxStyle key={index}>
          {item.rank === 1 ? (
            <Badge1 />
          ) : item.rank === 2 ? (
            <Badge2 />
          ) : (
            <Badge3 />
          )}
          <CircleBox $rank={item.rank}></CircleBox>
          <NameStyle>{item.name}</NameStyle>
          <Box>
            <Badge />
            <p>{item.number}</p>
          </Box>
        </BoxStyle>
      ))}
    </Root>
  );
};
export default RankingComponent;
