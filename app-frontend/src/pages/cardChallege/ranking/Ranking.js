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
      if (isLoggedIn) {
        const userData = await userRankings(isLoggedIn);
        const data = await updateRankings();

        if (userData?.status === 204) {
          setUserRanking(null);
        } else if (typeof userData === 'string') {
          console.log(userData); // 예외 발생시 다이얼로그 처리 필요
        } else if (userData?.data) {
          setUserRanking(userData.data);
        }

        if (data?.status === 204 || !data?.data) {
          setRankingList([]);
        } else if (typeof data === 'string') {
          console.log(data); // 예외 발생시 다이얼로그 처리 필요
        } else if (data?.data) {
          setRankingList(data.data);
        }
      }
    };

    initializeRankings();
  }, [isLoggedIn]);

  // 이름을 마스킹하는 함수
  const maskName = (name) => {
    if (!name) return '이름 없음'; // name이 undefined 또는 null이면 기본값 반환

    if (name.length === 3) {
      return name[0] + '*' + name[2];
    } else if (name.length > 3) {
      return name[0] + '**' + name.slice(3);
    }
    return name;
  };

  return (
    <Root>
      <RankingComponent rankingList={rankingList} maskName={maskName} />
      <RankingTable
        users={users}
        isLoggedIn={isLoggedIn}
        userRanking={userRanking || {}}
        rankingList={rankingList || []}
        maskName={maskName}
      />
    </Root>
  );
};
export default Ranking;
