import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Medal1 } from '../../../assets/images/Medal1.svg';
import { ReactComponent as Medal2 } from '../../../assets/images/Medal2.svg';
import { ReactComponent as Medal3 } from '../../../assets/images/Medal3.svg';
import { ReactComponent as Profile } from '../../../assets/images/Profile.svg';
import { fetchUserRanking } from '../../../apis/rankingApi';

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

const RankingComponent = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getRanking = async () => {
      try {
        const data = await fetchUserRanking();
        // badge 기준 내림차순 정렬하고 상위 3개 추출
        const sortedList = data
          .sort((a, b) => b.badge - a.badge) // badge 기준 내림차순 정렬
          .slice(0, 3); // 상위 3개만 추출

        setList(sortedList);
      } catch (error) {
        console.error('Error fetching rankings: ', error);
      }
    };

    getRanking();
  }, []);

  return (
    <Root>
      {list.length === 0 ? (
        <></>
      ) : (
        list.map((item, index) => (
          <BoxStyle key={index}>
            <CircleBox $rank={index}>
              {item.profile !== 'temp_profile' ? (
                <img
                  src={`http://localhost:8065${item.profile}`}
                  alt={item.name}
                />
              ) : (
                <Profile />
              )}
            </CircleBox>
            <NameStyle>
              {item.name}({item.userId})
            </NameStyle>
            <Box>
              {index === 0 ? <Medal1 /> : index === 1 ? <Medal2 /> : <Medal3 />}
              <p>{item.badge.toLocaleString()}</p>
            </Box>
          </BoxStyle>
        ))
      )}
    </Root>
  );
};
export default RankingComponent;
