import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Medal1 } from '../../../assets/images/Medal1.svg';
import { ReactComponent as Medal2 } from '../../../assets/images/Medal2.svg';
import { ReactComponent as Medal3 } from '../../../assets/images/Medal3.svg';
import { ReactComponent as Profile } from '../../../assets/images/Profile.svg';

const Root = styled.div`
  width: 100%;
`;

const RootIn = styled.div`
  & > div {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    margin-bottom: 30px;
    & > div:nth-child(1) {
      order: 2;
    }
    & > div:nth-child(2) {
      order: 1;
    }
    & > div:nth-child(3) {
      order: 3;
    }
  }
`;

const BoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CircleBox = styled.div`
  width: ${(props) => (props.$rank === 0 ? '190px' : '150px')};
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.color.brightGray};
  margin: 20px 0px;
  overflow: hidden;
  background: ${(props) => props.theme.color.brightGray};
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 130%;
    height: 130%;
    object-fit: cover;
  }
  & svg {
    width: ${(props) => (props.$rank === 0 ? '120px' : '90px')};
    height: ${(props) => (props.$rank === 0 ? '120px' : '90px')};
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

const RankingComponent = ({ rankingList = [], maskName }) => {
  const [top3, setTop3] = useState([]);

  useEffect(() => {
    if (rankingList.length > 0) {
      // 최종 1~3등을 정리할 배열
      const top3 = [];

      for (let i = 0; i < rankingList.length; i++) {
        const user = rankingList[i];

        top3.push(user);

        if (top3.length === 3) break;
      }

      setTop3(top3);
    }
  }, [rankingList]);

  return (
    <Root>
      <RootIn>
        {top3.length === 0 ? (
          <></>
        ) : (
          <div>
            {top3.length === 2 ? (
              <BoxStyle>
                <CircleBox $rank={0}>
                  {top3[0].profile !== 'temp_profile' ? (
                    <img
                      src={`http://localhost:8065${top3[0].profile}`}
                      alt={maskName(top3[0].name)}
                    />
                  ) : (
                    <Profile />
                  )}
                </CircleBox>
                <NameStyle>
                  {maskName(top3[0].name)}({top3[0].userId})
                </NameStyle>
                <Box>
                  <Medal1 />
                  <p>{top3[0].badge.toLocaleString()}개</p>
                </Box>
              </BoxStyle>
            ) : (
              top3.map((item, index) => (
                <BoxStyle key={index}>
                  <CircleBox $rank={index}>
                    {item.profile !== 'temp_profile' ? (
                      <img
                        src={`http://localhost:8065${item.profile}`}
                        alt={maskName(item.name)}
                      />
                    ) : (
                      <Profile />
                    )}
                  </CircleBox>
                  <NameStyle>
                    {maskName(item.name)}({item.userId})
                  </NameStyle>
                  <Box>
                    {index === 0 ? (
                      <Medal1 />
                    ) : index === 1 ? (
                      <Medal2 />
                    ) : (
                      <Medal3 />
                    )}
                    <p>{item.badge.toLocaleString()}개</p>
                  </Box>
                </BoxStyle>
              ))
            )}
          </div>
        )}
      </RootIn>
    </Root>
  );
};
export default RankingComponent;
