import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RankingComponent from './RankingComponent';
import RankingTable from './RankingTable';
import { updateRankings, userRankings } from '../../../apis/rankingApi';
import { findUserById } from '../../../apis/userApi';
import { useSelector } from 'react-redux';

const Root = styled.div`
  width: ${(props) => props.theme.display.sm};
  margin: 0 auto;
`;

const Ranking = () => {
  const isLoggedIn = useSelector((state) => state.user.user?.userNum); // 현재 로그인한 유저의 userNum
  const [users, setUsers] = useState(null);
  const [userRanking, setUserRanking] = useState([]);
  const [rankingList, setRankingList] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isLoggedIn) {
        console.log('로그인 정보가 없습니다.');
      } else {
        const user = await findUserById(isLoggedIn);
        if (user != null && typeof user != 'string') {
          setUsers(user.data);
        }
      }
    };

    fetchUser();
  }, [isLoggedIn]);

  useEffect(() => {
    const initializeRankings = async () => {
      const userData = await userRankings(isLoggedIn);
      const data = await updateRankings();
      if (typeof userData === 'string') {
        console.log(userData); // 예외 발생시 다이얼로그 처리 필요
      } else if (userData != null) {
        setUserRanking(userData);
      }

      if (typeof data === 'string') {
        console.log(data); // 예외 발생시 다이얼로그 처리 필요
      } else if (data != null) {
        setRankingList(data);
      }
    };

    initializeRankings();
  }, [isLoggedIn]);

  // 이름을 마스킹하는 함수
  const maskName = (name) => {
    if (name.length === 3) {
      return name[0] + '*' + name[2];
    } else if (name.length > 3) {
      return name[0] + '**' + name.slice(3);
    }
    return name; // 기본적으로 그대로 반환
  };

  return (
    <Root>
      <RankingComponent rankingList={rankingList} maskName={maskName} />
      <RankingTable
        users={users}
        isLoggedIn={isLoggedIn}
        userRanking={userRanking}
        rankingList={rankingList}
        maskName={maskName}
      />
    </Root>
  );
};
export default Ranking;
